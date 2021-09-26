import User from "../models/User.js";
import sendMail from "../helpers/emailHelper.js";

async function sendEmailTaskNotification(taskObj, type, userid) {
    let { task, clientduedate: duedate } = taskObj;
    //extract task from the obj
    let subject;
    let emailBody;
    let user = await User.findById({ _id: userid });

    if (type === "duedate") {
        subject = "Duedate Has Passed For Task";
        emailBody = `<p>Hi ${user.username} , The duedate for the task ${task} is reached. Ignore if its cleared. </p>`;
    } else if (type === "reminder") {
        subject = "Reminder For Task";
        emailBody = `<p> Hi ${user.username}. This is a reminder for the task <strong>${task}</strong> which is due on ${duedate} </p>`;
    }

    sendMail(user.email, subject, emailBody);
}

export default sendEmailTaskNotification;
