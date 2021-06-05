require('dotenv').config();
const Request = require('request');
const moment = require('moment');
const URI = require('urijs');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SIDccountSid, process.env.TWILIO_AUTH_TOKEN); //add your credientials to env file

const params = { district_id: 1212/*add district id here*/, date: (moment().utcOffset('+05:30').format('DD-MM-YYYY')).toString() /*set to ist*/, vaccine: 'COVAXIN'/*'COVAXIN' or 'COVISHIELD'*/ };
const phoneNumbersToAlert = [/*add phone numbers to be notified here*/];

const sendSmsToMultipleRecipients = (slots, name, number) => {
  // console.log(`VACCINE ${slots} dose II slot is now avilable in ${name}!`);
  client.messages
    .create({
      body: `VACCINE ${slots} slot is now avilable in ${name}!`,
      from: '+12393070034', // number you got from twillio here
      to: number,
    })
    .then((message) => console.log(message.sid));
  console.log(`VACCINE ${slots} dose II slot is now avilable in ${name}!`);
};

Request.get(
  new URI('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?')
    .query(params)
    .toString(),
  (error, response, body) => {
    if (error) {
      return console.log('ERROR', error);
    }
    JSON.parse(body).centers.map((item) => {
      item.sessions.map((itemTwo) => {
        if (itemTwo.vaccine === 'COVAXIN' && itemTwo.min_age_limit === 18 && itemTwo.available_capacity_dose2 > 3) { // tune these conditions as per your needs to trigger a alert 
          phoneNumbersToAlert.forEach((i) => {
            sendSmsToMultipleRecipients(itemTwo.available_capacity_dose2, item.name, i);
          });
        }
        return null;
      });
      return null;
    });
    return null;
  },
);
