var Layout = require("Layout");
var settings = require("Storage").readJSON("habitbuilder.settings.json");
var dataFile = require("Storage").open("habitbuilder.data.csv", "a");

var layout = new Layout(
  {
    type: "v", c: [
        {type:"txt", wrap: true, fillx: 1, height: 50, font:"6x8:2", label:settings.questions[0], id:"question"},
      ],
  },
  {
    btns: [
      {id:"yes", label:"Yes", cb: l=>print('yes')},
      {id:"no", label:"No", cb: l=>print('no')}
    ],
    lazy: true
  });

layout.update();

function drawQuestion(questionIdx) {
  layout.question.label = settings.questions[questionIdx];
  layout.yes.cb = l => setAnswer(questionIdx, 1);
  layout.no.cb = l => setAnswer(questionIdx, 0);
  layout.render();
}

function getDateString(date) {
  return date.toISOString().substr(0,10);
}

function setAnswer(questionIdx, answer) {
  var date = new Date();
  var dateStr = getDateString(date);
  var question = settings.questions[questionIdx];

  var data = [question, dateStr, answer];
  dataFile.write(data.join(",") + "\n");

  if (settings.questions[questionIdx + 1]) {
    drawQuestion(questionIdx + 1);
  } else {
    Bangle.setUI();
    E.showMessage("All done for today!");
  }
}

g.clear();
drawQuestion(0);
