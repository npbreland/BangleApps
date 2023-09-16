const Storage = require("Storage");
const Layout = require("Layout");

const filename = "settings.json";
const settings = Storage.readJSON(filename);

const dataFile = Storage.open("data.csv", "a");

function showQuestion(questionIdx) {
  const layout = new Layout( {
    type: "v", c: [
      {type:"txt", wrap: true, fillx: 1, height: 50, font:"6x8:2", label:settings.questions[questionIdx], id:questionIdx},
      {type: "h", c: [
        {type:"btn", font:"6x8:2", pad:2, width: 75, label:"Yes", cb: l=>setAnswer(questionIdx, 1) },
        {type:"btn", font:"6x8:2", pad:2, width: 75, label:"No", cb: l=>setAnswer(questionIdx, 0) }
      ]}
    ]
  });
  g.clear();
  layout.render();
}

function getDateString(date) {
  return date.toISOString().substr(0,10);
}

function setAnswer(questionIdx, answer) {
  const date = new Date();
  const dateStr = getDateString(date);
  const question = settings.questions[questionIdx];

  const data = [question, dateStr, answer];
  dataFile.write(data.join(",") + "\n");

  if (settings.questions[questionIdx + 1]) {
    showQuestion(questionIdx + 1);
  } else {
    E.showMessage("All done for today!");
  }
}

/*
Might use these for a widget later

function getFeaturedQuestion() {
  const entries = Object.entries(questionData);
  let question, data;
  for (let i = 0; i < entries.length; i++) {
    question = entries[i][0];
    data = entries[i][1];
    if (data.featured === true) {
      return question;
    }
  }
  return false;
}


function getStreak(question, endDate) {
  const responses = questionData[question].responses;
  let streak = 0;
  const date = endDate;
  let dateString = getDateString(date);

  while (responses[dateString] && responses[dateString] === true) {
    streak++;
    date.setDate(date.getDate() - 1);
    dateString = getDateString(date);
  }
  return streak;
}
*/

showQuestion(0);

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
