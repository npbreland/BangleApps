// ex. 08:00 -> 28800000
function getMillisecondsSinceMidnight(timeStr) {
  const [hours, minutes] = timeStr.split(":");
  return hours * 3600000 + minutes * 60000;
}

exports.setHabitAlarm = function () {
  const FILENAME = "habitbuilder.json";
  const data = require("Storage").readJSON(FILENAME, true);

  const reminderTime = data.reminderTime || "21:00";

  sched.setAlarm("habitbuilder", {
    t: getMillisecondsSinceMidnight(reminderTime),
    appid: "habitbuilder",
    js: "load(habitbuilder.app.js)"
  });
};
