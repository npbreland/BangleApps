require("sched").setAlarm("habitbuilder", {
  appid: "habitbuilder",
  js: "load(habitbuilder.app.js)",
  t: require("Storage").readJSON('habitbuilder.settings.json').reminderTime,
  rp: true
});
