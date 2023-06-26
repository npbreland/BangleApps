function buildSettingsForm(questions = [], reminderTime = "") {
  let settingsHtml = "";
  let question = "";
  for (let i = 0; i < 5; i++) {
    question = questions[i] || "";
    settingsHtml += questionComponent(question, i);
  }

  settingsHtml += `<p>Reminder time <input type="time" id="remindertime" class="form-input" value="${reminderTime}"></p>`;
  return settingsHtml;
};

function getSettingsFromForm() {
  const questions = [];
  for (let i = 0; i < 5; i++) {
    questions.push(document.getElementById(`question${i}`).value);
  }
  const reminderTime = document.getElementById("remindertime").value;

  if (questions.length === 0) {
    alert("Please enter at least one question.");
    return;
  }

  if (!reminderTime) {
    alert("Please enter a reminder time.");
    return;
  }

  return { questions, reminderTime };
}

function questionComponent(question, i) {
  return `<p>Question ${i} <input type="text" id="question${i}" class="form-input" value="${question}"></p>`;
}

