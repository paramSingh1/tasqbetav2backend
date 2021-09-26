import { scheduleJob } from "node-schedule";
import sendEmailTaskNotification from "../helpers/sendEmailTaskNotification.js";
import sendSMSTaskNotification from "../helpers/sendSMSTaskNotification.js";

function remindersScheduler(todoData, userid) {
    let {
        serverreminders: reminders,
        notificationType,
        _id: todoid,
    } = todoData;
    todoid = todoid.toString();
    reminders.forEach((reminder, index) => {
        scheduleJob(`trigger-notification-reminder-${index}:${userid}:${todoid}`,
            reminder,
            function () {
                if (notificationType === "email") {
                    console.log("sending email --> here in reminders");
                    sendEmailTaskNotification(todoData, "reminder", userid);
                } else if (notificationType === "sms") {
                    console.log(`sending sms --? here in reminders`);
                    sendSMSTaskNotification(todoData, "reminder", userid);

                } else {
                    console.log(`sending sms and email - notification ${todoid}`);
                    sendEmailTaskNotification(todoData, "reminder", userid);
                    sendSMSTaskNotification(todoData, "reminder", userid);
                }
            }
        );
    });
}

export default remindersScheduler;