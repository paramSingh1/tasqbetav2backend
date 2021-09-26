import User from '../models/User.js';
import sendSMS from "../helpers/smsHelper.js";

async function sendSMSTaskNotification(taskObj, type, userid) {
    let { task, clientduedate: duedate } = taskObj;
    //extract task from the obj
    let smsMessage;

    let user = await User.findById({ _id: userid });

    if (type === "duedate") {
        smsMessage = `Hi ${user.username} , The duedate for the task ${task} has reached. Ignore if the task is cleared.`;
    } else if (type === "reminder") {
        smsMessage = `Hi ${user.username}. This is a reminder for the task ${task} which is due on ${duedate} `;
    }

    sendSMS("+13012652317", user.phone, smsMessage);
}

export default sendSMSTaskNotification;