require("sched").setAlarm("habitbuilder", {
  appid: "habitbuilder",
  js: "load(habitbuilder.app.js)",
  t: require("Storage").readJSON('settings.json').reminderTime,
  rp: true
});
//require("sched").reload();
