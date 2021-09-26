import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import config from "config";
import randomstring from "randomstring";
import {
  userRegisterValidationRules,
  errorMiddleware,
} from "../../middlewares/validations/index.js";
//Import Auth Middleware
import auth from "../../middlewares/auth/index.js";
import sendMail from "../../helpers/emailHelper.js";
import sendSMS from "../../helpers/smsHelper.js";
//Import User Models
import User from "../../models/User.js";
import UserTodo from "../../models/UserTodos.js";
import Admin from "../../models/Admin.js";
/*
    API EndPoint : /api/user/register
    Method : POST
    Payload : Request.Body - username,email,password,confirmpassword,phone
    Access Type : Public
    Validations : 
        a) Check Valid Email and Avoid Duplicate Email Registration
            Note : User Email address cannot be admin email and organisation email
        b) Password should be hashed (bcrypt) and Implement Password Strength
        c) Password and Confirm Password should be equal
        d) Valid International Phone Number

    Description : User Signup
*/

router.post(
  "/register",
  userRegisterValidationRules(),
  errorMiddleware,
  async (req, res) => {
    try {
      const userdata = await User.findOne({ email: req.body.email });
      // Avoid Double Registration
      if (userdata) {
        return res
          .status(409)
          .json({ error: "User Email Address Already Registered" });
      }
      const admindata = await Admin.findOne({ email: req.body.email });
      if (admindata) {
        return res
          .status(409)
          .json({ error: "User Email Address Already Registered as Admin" });
      }
      // Password Hashed
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      const user = new User(req.body);
      user.tokens.emailtoken = randomstring.generate();
      user.tokens.smstoken = randomstring.generate(5);
      const usertodos = new UserTodo();
      usertodos.user = user._id;
      await user.save();
      await usertodos.save();
      //Trigger an email for to verify user email address
      sendMail(
        user.email,
        `Hello ${user.username} - TasQ Email Confirmation`,
        `Hello ${req.body.username} ! <br />
                Welcome to TasQ Solutions. Please verify your account.
                <p>Click this URL to Verify: <a href="${config.get(
                  "host"
                )}/api/user/verify/email/${
          user.tokens.emailtoken
        }">Click Here</a></p>`
      );
      sendSMS(
        "+13012652317",
        user.phone,
        `Hello ${
          req.body.username
        }. Please verify your account here ${config.get(
          "host"
        )}/api/user/verify/sms/${user.tokens.smstoken}`
      );
      res.status(200).json({ success: "User is Registered Succesfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/*
    API EndPoint : /api/user/verify/email/:token
    Method : GET
    Payload : Request.Params
    Access Type : Public
    Validations : 
        a) Check Valid Token and Set Verified to true if it matches

    Description : User Email Address Verification
*/
router.get("/verify/email/:token", async (req, res) => {
  try {
    const emailToken = req.params.token;
    const user = await User.findOne({ "tokens.emailtoken": emailToken });
    if (user.verified.emailverified) {
      return res
        .status(200)
        .json({ Success: "User Email Address is Already Verified" });
    }
    user.verified.emailverified = true;
    await user.save();
    res.status(200).json({ Success: "User Email Address is Verified" });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});
/*
    API EndPoint : /api/user/verify/sms/:token
    Method : GET
    Payload : Request.Params
    Access Type : Public
    Validations : 
        a) Check Valid Token and Set Verified to true if it matches

    Description : User Email Address Verification
*/
router.get("/verify/sms/:token", async (req, res) => {
  try {
    const smsToken = req.params.token;
    const user = await User.findOne({ "tokens.smstoken": smsToken });
    if (user.verified.smsverified) {
      return res
        .status(200)
        .json({ Success: "Your Phone Number is Already Verified" });
    }
    user.verified.smsverified = true;
    await user.save();
    res.status(200).json({ Success: "Your Phone Number is Verified" });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

/*
    API EndPoint : /api/user/all
    Method : GET
    Payload : None
    Access Type : Public
    Description : Display all the registered users on the platform (Public Profile)
*/

router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find({}, "username email _id");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

/*
    API EndPoint : /api/user/info
    Method : GET
    Payload : None
    Access Type : Private
    Description : Display User Info and Role (Public Profile)
*/

router.get("/info", auth, async (req, res) => {
  try {
    let user;
    if (req.user.role === "admin") {
      user = await Admin.findById(req.user.userid, "username email role -_id ");
      return res.status(200).json(user);
    }
    if (req.user.role === "user") {
      user = await User.findById(
        req.user.userid,
        "username email role verified phone -_id locked"
      );
      if (user.locked) {
        return res.status(403).json({
          error:
            "Your account is suspended please contact help@tasq.one to recitfy.",
        });
      }
      return res.status(200).json(user);
    }
    if (!user) {
      return res.status(401).json({ error: "Access Denied." });
    }
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
