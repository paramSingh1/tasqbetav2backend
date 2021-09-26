import { scheduledJobs } from "node-schedule";

function cancelServiceWorker(todoid) {
    //delete user logic
    let regex = new RegExp(`:(${todoid}$)`);
    const keys = Object.keys(scheduledJobs).filter((key) => regex.test(key));
    //console.log("we are cancelling", keys);

    if (keys.length) {
        keys.forEach((key) => {
            scheduledJobs[key].cancel();
        });
    }
}

export default cancelServiceWorker;