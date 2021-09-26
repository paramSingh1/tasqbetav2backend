import express from "express";
import bcrypt from "bcrypt";
//Import Models
import Admin from "../../models/Admin.js";
import User from "../../models/User.js";

import {
  userLoginValidationRules,
  errorMiddleware,
} from "../../middlewares/validations/index.js";
import generateAccessToken from "../../helpers/accessTokenHelper.js";

const router = express.Router();

router.post(
  "/",
  userLoginValidationRules(),
  errorMiddleware,
  async (req, res) => {
    try {
      //Search the user email in Admin Collection
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        //verify password logic
        const result = await bcrypt.compare(req.body.password, admin.password);
        if (!result) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }
        //Create a Payload for the access token
        const payload = {
          userid: admin._id,
          role: admin.role,
        };
        let cyphertoken = generateAccessToken(payload);
        return res.status(200).json({ cyphertoken });
      }
      //If not in admin, Search in User Collection
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      //Verify for user password
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      //Create a Payload for the access token
      const payload = {
        userid: user._id,
        role: user.role,
      };
      let cyphertoken = generateAccessToken(payload);
      return res.status(200).json({ cyphertoken });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

export default router;
