import { scheduleJob } from "node-schedule";
import sendEmailTaskNotification from "../helpers/sendEmailTaskNotification.js";
import sendSMSTaskNotification from "../helpers/sendSMSTaskNotification.js";
function duedateScheduler(todoData, userid) {
    let { serverduedate: duedate, notificationType, _id: todoid } = todoData;
    todoid = todoid.toString();
    console.log(duedate, notificationType, todoid);
    scheduleJob(`trigger-notification-duedate:${userid}:${todoid}`,
        duedate,
        function () {
            if (notificationType == 'email') {
                console.log("Send an email");
                sendEmailTaskNotification(todoData, "duedate", userid);
            } else if (notificationType == 'sms') {
                console.log("Send an SMS");
                sendSMSTaskNotification(todoData, "duedate", userid);
            } else {
                console.log("Send Both SMS and Email");
                sendEmailTaskNotification(todoData, "duedate", userid);
                sendSMSTaskNotification(todoData, "duedate", userid);
            }
        }
    )
}


export default duedateScheduler;