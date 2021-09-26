import twilio from 'twilio';
import config from 'config';
const accountSid = config.get("twilio").accountSid;
const authToken = config.get("twilio").authToken;

async function sendSMS(senderPhone, receiverPhone, body) {
    const client = new twilio(accountSid, authToken);
    await client.messages
        .create({
            body: body,
            to: receiverPhone,
            from: '+13012652317',
        });
}

export default sendSMS;




