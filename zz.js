import axios from 'axios'

let eg = {
        "task": "Push your code to GitHub",
        "category": "personal",
        "clientduedate": "Sun Sep 27 2021 18:19:13 GMT+0530",
        "serverduedate":"2021-09-27T05:05:15.000+00:00",
        "note": "All assigments should be submitted ",
        "priority": "urgent",
        "notificationType": "both",
        "clientreminders": [
            "Sun Sep 26 2021 23:37:06 GMT+1000",
            "Sun Sep 26 2021 23:53:06 GMT+1000"
        ],
        "serverreminders": [ "2021-09-27T12:38:20.000Z", "2021-09-27T05:59:07.000Z" ],
        "timezone": "Bombay/India"
    }
axios.post("http://localhost:8080/api/duedate/scheduleduedate")
.then((res)=>{
    console.log(res.data)
})
.catch((err)=>{
    console.log(err);
})
