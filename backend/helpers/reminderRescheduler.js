
import { scheduledJobs } from "node-schedule";
import remindersScheduler from "./remindersScheduler.js";

function remindersRescheduler(todoData, userid) {
    let { _id: todoid, serverreminders: reminders } = todoData;
    todoid = todoid.toString();

    let regex = new RegExp(`trigger-notification-reminder-(.*):(${todoid})`);
    const keys = Object.keys(scheduledJobs).filter((key) => regex.test(key));
    if (keys.length) {
        for (let i = 0; i < reminders.length; i++) {
            let key = keys[i];
            scheduledJobs[key].cancel();
        }
        remindersScheduler(todoData, userid);
    } else {
        remindersScheduler(todoData, userid);
    }
}

export default remindersRescheduler;