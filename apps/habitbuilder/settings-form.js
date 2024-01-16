function buildSettingsForm(questions = [], reminderTime = "") {
  let settingsHtml = "";
  let question = "";
  for (let i = 0; i < 5; i++) {
    question = questions[i] || "";
    settingsHtml += questionComponent(question, i);
  }

  const time = getTimeFromMs(reminderTime);

  settingsHtml += `<p>Reminder time <input type="time" id="remindertime" class="form-input" value="${time}"></p>`;
  return settingsHtml;
}

function getSettingsFromForm() {
  const questions = [];
  for (let i = 0; i < 5; i++) {
    questions.push(document.getElementById(`question${i}`).value);
  }
  const reminderTime = document.getElementById("remindertime").value;

  if (questions.length === 0) {
    alert("Please enter at least one question.");
    return false;
  }

  if (!reminderTime) {
    alert("Please enter a reminder time.");
    return false;
  }

  return { questions, reminderTime: getMsFromMidnight(reminderTime) };
}

function questionComponent(question, i) {
  return `<p>Question ${i+1} <input type="text" id="question${i}" class="form-input" value="${question}"></p>`;
}

// ex. 08:00 -> 28800000
function getMsFromMidnight(timeStr) {
  const [hours, minutes] = timeStr.split(":");
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}

function getTimeFromMs(ms) {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}:${minutes}`;
}

function disableFormInput() {
  document.querySelectorAll(".form-input").forEach(el => el.disabled = true);
  document.querySelectorAll(".btn").forEach(el => el.disabled = true);
}

