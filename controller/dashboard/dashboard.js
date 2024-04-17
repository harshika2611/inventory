const logger = require("../../logs");
const { getTime } = require('../../service/dashboard/dashboard.js');

async function dashboard(req, res) {
  const currenttime = new Date();
  console.log(currenttime);
  const utccurrent = currenttime.toUTCString();
  // console.log(utccurrent);
  // console.log(currenttime.getHours());
  console.log(currenttime.getTimezoneOffset());
  const timeArray = await getTime();
  // console.log(timeArray);
  const dbTime = new Date(timeArray[2].created_at);
  console.log(dbTime);
  // console.log(dbTime.getHours());
  console.log(dbTime.getTimezoneOffset());
  // console.log(dbTime.toUTCString());

  res.render('dashboard/dashboard');
}

module.exports = dashboard