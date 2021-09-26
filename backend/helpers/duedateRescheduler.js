import { scheduledJobs } from "node-schedule";

import duedateScheduler from "./duedateScheduler.js";

function duedateRescheduler(todoData, userid) {
    let { _id: todoid } = todoData;
    todoid = todoid.toString();

    let regex = new RegExp(`trigger-notification-duedate:.*:(${todoid})`);

    const key = Object.keys(scheduledJobs).filter((key) => regex.test(key));

    if (key.length) {
        scheduledJobs[key].cancel();
        duedateScheduler(todoData, userid);
    }else{
        duedateScheduler(todoData, userid);
    }
}

export default duedateRescheduler;