# cowin-slot-tracker-using-twilio
A cowin slot tracker for text based alerts on slots availability using twilio sms services, written in node.js

Some values need to be defined by users for a desired vaccine notification alert - please check comments in code and replace with your specifications.
Add Twilio auth token & sid by creating a free account on the site. https://www.twilio.com/console

Set a cron job for the task if deploying on a server on every 15 minutes, same interval if deploying on heroku. (please do not use the script with less than 15 min intervals}

// this is a quick job, so code can be a little rough !
