import express from "express";
//Import Models
import Admin from "../../models/Admin.js";
import User from "../../models/User.js";
import UserProfile from "../../models/UserProfile.js";

import gravatar from "gravatar";

//Import Auth middleware
import auth from "../../middlewares/auth/index.js";
const router = express.Router();

router.use(auth);

/*
    API EndPoint : /api/user/profile/add
    Method : POST (You can also with for update profile or add profile details)
    Access Type : Private
    Description : Access the User Profile 
*/

router.post("/add", auth, async (req, res) => {
  try {
    let profile = await UserProfile.findOne({ user: req.user.userid });
    if (profile) {
      //Then just update profile logic
      profile = await UserProfile.findOneAndUpdate(
        { user: req.user.userid },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(profile);
    }
    //Construct New Profile Details (Create A new Profile)
    const userprofiledata = new UserProfile(req.body);
    userprofiledata.user = req.user.userid;
    const url = gravatar.url("dazzmamaril@gmail.com", {
      s: "200",
      r: "pg",
      d: "mp",
    });
    userprofiledata.profilepic = url;
    await userprofiledata.save();
    res.status(200).json(userprofiledata);
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

/*
    API EndPoint : /api/user/profile
    Method : GET
    Access Type : Private
    Description : Access the User Profile 
*/

router.get("/", auth, async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({
      user: req.user.userid,
    }).populate("user", ["username", "profilepic", "email"]);
    if (userProfile) {
      return res.status(200).json({ userProfile });
    }
    res.status(400).json({ msg: "There is no Profile for this User" });
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
