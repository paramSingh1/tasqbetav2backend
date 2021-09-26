import twilio from "twilio";
import config from "config";
const accountSid = config.get("twilio").accountSid;
const authToken = config.get("twilio").authToken;

function getPastWeek(){
    let date = new Date();

let dates = date.getDate() - 1;

let arr = [];
let d = new Date();
for (let i = 0; i < 7; i++) {
  let dt = d.setDate(d.getDate() - 1);
dt = new Date(dt)

  let year = dt.getFullYear();
  let month = dt.getMonth();
  let day = dt.getDate();

  dt = new Date(Date.UTC(year, month, day, 0, 0, 0))
  arr.push(dt);
}
return arr;
}
   



console.log(getPastWeek())

const getData = async() =>{
    try {
        const client = new twilio(accountSid, authToken);
        let dateArr = getPastWeek();
        let twilioInfo = dateArr.map(ele=>client.messages.list({dateSent:ele ,from: '+13012652317'}) )

        let info = await Promise.all(twilioInfo);
        let array = info.map((ele,i) => ({sms:ele.length,date:dateArr[i]}))
        console.log(array)


    } catch (error) {
     console.log(error)   
    }
   
}
// dt = new Date(dt).toUTCString();

// async function getData() {
//     const client = new twilio(accountSid, authToken);
//    try {
//     await client.messages
//     .list({
//         dateSent:  new Date(Date.UTC(year, month, day, 0, 0, 0)),
//         from: '+13012652317'
//     })
//     .then(messages => messages.forEach(m => console.log(m)));

//    } catch (error) {
//         console.log(err)
//    }

// }

getData();
