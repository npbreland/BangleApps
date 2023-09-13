require("sched").setAlarm("habitbuilder", {
  appid: "habitbuilder",
  js: "load(habitbuilder.app.js)",
  t: require("Storage").readJSON('habitbuilder.json').reminderTime,
  rp: true
});
//require("sched").reload();
