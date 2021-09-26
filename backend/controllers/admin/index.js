import express from "express";
const router = express.Router();
//Import Auth middleware
import auth from "../../middlewares/auth/index.js";
//Import Models
import Admin from "../../models/Admin.js";
import User from "../../models/User.js";
import UserProfile from "../../models/UserProfile.js";
import UserTodo from "../../models/UserTodos.js";
import getTwilioData from "../../helpers/twilioStats.js";

router.get("/", auth, async (req, res) => {
  try {
    const adminData = await Admin.findById(req.user.userid);
    if (!adminData) {
      return res.status(403).json({ Error: "Access Denied" });
    }
    //Access anlaytics from UserTodos model and User PRofile Model etc..,

    res.status(200).json({ adminData });
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

router.put("/lock/:id", auth, async (req, res) => {
  const userid = req.params.id;
  try {
    const adminData = await Admin.findById(req.user.userid);
    if (!adminData) {
      return res.status(403).json({ Error: "Access Denied" });
    }
    const user = await User.findOne({ _id: userid });
    user.locked = !user.locked;
    await user.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});
router.get("/todos/:id", auth, async (req, res) => {
  try {
    const adminData = await Admin.findById(req.user.userid);
    if (!adminData) {
      return res.status(403).json({ Error: "Access Denied" });
    }
    const { id } = req.params;
    const userData = await UserTodo.findOne({ user: id });
    if (!userData) {
      return res.status(400).json({ errors: [{ msg: "User Not Found" }] });
    }
    const { todos } = userData;
    res.status(200).json({ todos: todos.length });
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/info/:id", auth, async (req, res) => {
  try {
    const adminData = await Admin.findById(req.user.userid);
    if (!adminData) {
      return res.status(403).json({ Error: "Access Denied" });
    }
    const { id } = req.params;
    let user = await User.findById(
      id,
      "username email role verified -_id locked phone"
    );
    if (!user) {
      return res.status(401).json({ error: "User Doesnt Exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/twilioStats", auth, async (req, res) => {
  try {
    const adminData = await Admin.findById(req.user.userid);
    if (!adminData) {
      return res.status(403).json({ Error: "Access Denied" });
    }
    let data = await getTwilioData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err: "Unable to fetch Twilio Info Right Now" });
  }
});
router.get("/todocount", auth, async (req, res) => {
  try {
    const adminData = await Admin.findById(req.user.userid);
    if (!adminData) {
      return res.status(403).json({ Error: "Access Denied" });
    }
    const todo = await UserTodo.find({});

    let data = {
      allTodos: 0,
      notiSms: 0,
      notiEmail: 0,
    };
    todo.forEach((ele) => {
      data.allTodos += ele.todos.length;
      ele.todos.forEach((noti) => {
        if (noti.notificationType === "both") {
          data.notiEmail += 1;
          data.notiSms += 1;
        } else if (noti.notificationType === "sms") {
          data.notiSms += 1;
        } else if (noti.notificationType === "email") {
          data.notiEmail += 1;
        }
      });
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
