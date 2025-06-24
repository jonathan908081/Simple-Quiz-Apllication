//darkmode
const darkMode = document.getElementById("darkMode");
const darkModeContainer = document.querySelector(".dark__mode");

if (localStorage.getItem("darkMode") === "enabled") {
  enableDarkMode();
}

darkMode.addEventListener("click", toggleMode);
function toggleMode() {
  if (document.body.classList.contains("dark")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}
function disableDarkMode() {
  document.body.classList.remove("dark");
  darkModeContainer.innerHTML = '<img src="./assets/moon.png" alt="Dark Mode">';
  localStorage.setItem("darkMode", "disabled");
}
function enableDarkMode() {
  document.body.classList.add("dark");
  darkModeContainer.innerHTML = '<img src="./assets/sun.png" alt="Light Mode">';
  localStorage.setItem("darkMode", "enabled");
}

//open nav
const openNav = document.getElementById("openNav");
const navigationList = document.querySelector(".navigation__list");
const closeMenu = document.getElementById("closeMenu");
const rightSection = document.querySelector(".right__section");
const section = document.querySelector("section");

openNav.addEventListener("click", () => {
  navigationList.classList.add("active");
  rightSection.style.backgroundColor = "hsl(210, 8%, 31%, .4)";
});
closeMenu.addEventListener("click", () => {
  navigationList.classList.remove("active");
  rightSection.style.backgroundColor = "";
});

rightSection.addEventListener("click", (e) => {
  if (e.target === rightSection) {
    navigationList.classList.remove("active");
    rightSection.style.backgroundColor = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navigationList.classList.remove("active");
    rightSection.style.backgroundColor = "";
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "o") {
    navigationList.classList.add("active");
    rightSection.style.backgroundColor = "hsl(210, 8%, 31%, .4)";
  }
});

//form validation
const form = document.querySelector("form");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

form.addEventListener("submit", checkForm);

function checkForm(e) {
  e.preventDefault();

  let isValid = true;
  isValid = validateUserName() && isValid;
  isValid = validateUserEmail() && isValid;

  if (isValid) {
    accountScreen.classList.remove("active");
    quizScreen.classList.add("active");
    startQuiz();
  }
}

function validateUserName() {
  const userNameValue = userName.value.trim();
  if (userNameValue === "") {
    showError(userName, "Full name is requred!");
    return false;
  }
  showSucess(userName);
  return true;
}

function validateUserEmail() {
  const userEmailValue = userEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (userEmailValue === "") {
    showError(userEmail, "Email Address is required!");
    return false;
  }
  if (!emailRegex.test(userEmailValue)) {
    showError(userEmail, "Invalid email format!");
    return false;
  }
  showSucess(userEmail);
  return true;
}

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.textContent = message;
  formControl.className = "form-control error";
}
function showSucess(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.textContent = "";
  formControl.className = "form-control";
}
/////////////quiz
const startScreen = document.getElementById("startScreen");
const startScreenBtn = document.getElementById("startScreenBtn");
const accountScreen = document.getElementById("accountScreen");
const quizScreen = document.getElementById("quizScreen");
const questionText = document.getElementById("questionText");
const currentQuestionSpan = document.getElementById("currentQuestionSpan");
const totalqUestionSpan = document.getElementById("totalqUestionSpan");
const scoreSpan = document.getElementById("score");
const progressBar = document.getElementById("progress");
const answerContainer = document.getElementById("answerContainer");
const resultScreen = document.getElementById("resultScreen");
const usernameSpan = document.getElementById("usernameSpan");
const useremailSpan = document.getElementById("useremailSpan");
const resultScore = document.getElementById("resultScore");
const maxScore = document.getElementById("maxScore");
const resultMessage = document.getElementById("resultMessage");
const restartQuiz = document.getElementById("restartQuiz");

const midwiferyQuiz = [
  // === Antenatal Care (15 Questions) ===
  {
    question:
      "What is the first step when conducting an antenatal examination?",
    answers: [
      { text: "Take blood pressure", correct: false },
      { text: "Wash hands and introduce yourself", correct: true },
      { text: "Measure fundal height", correct: false },
      { text: "Check fetal heart rate", correct: false },
    ],
  },
  {
    question:
      "At what gestational age should a pregnant woman receive her first dose of Tetanus Toxoid (TT)?",
    answers: [
      { text: "At first ANC visit (as early as possible)", correct: true },
      { text: "Only in the third trimester", correct: false },
      { text: "After delivery", correct: false },
      { text: "Only if she has an open wound", correct: false },
    ],
  },
  {
    question:
      "How many doses of Iron and Folic Acid (IFA) should a pregnant woman take daily?",
    answers: [
      { text: "One tablet weekly", correct: false },
      { text: "One tablet daily", correct: true },
      { text: "Two tablets only if anemic", correct: false },
      { text: "None if she eats well", correct: false },
    ],
  },
  {
    question:
      "What is the correct way to measure a pregnant woman’s blood pressure?",
    answers: [
      { text: "With the woman lying flat on her back", correct: false },
      {
        text: "After she has rested for 5 minutes, sitting upright",
        correct: true,
      },
      { text: "Immediately after physical activity", correct: false },
      { text: "Only if she complains of headache", correct: false },
    ],
  },
  {
    question: "Which of the following is a sign of severe pre-eclampsia?",
    answers: [
      { text: "Mild ankle swelling", correct: false },
      { text: "Blood pressure ≥160/110 mmHg", correct: true },
      { text: "Occasional dizziness", correct: false },
      { text: "Slight weight gain", correct: false },
    ],
  },
  {
    question:
      "What is the recommended schedule for antenatal visits in Uganda (FANC)?",
    answers: [
      { text: "One visit in the third trimester", correct: false },
      {
        text: "Four visits: Before 16w, 20-24w, 28-32w, 36-40w",
        correct: true,
      },
      { text: "Monthly visits starting at 12 weeks", correct: false },
      { text: "Only when the mother feels unwell", correct: false },
    ],
  },
  {
    question: "How do you confirm a pregnant woman’s HIV status under PMTCT?",
    answers: [
      { text: "Only if she requests testing", correct: false },
      { text: "Offer routine HIV testing with consent", correct: true },
      { text: "Test only if she looks sick", correct: false },
      { text: "Assume status based on symptoms", correct: false },
    ],
  },
  {
    question: "What is the correct way to perform Leopold’s maneuvers?",
    answers: [
      {
        text: "Palpate the abdomen to determine fetal position",
        correct: true,
      },
      { text: "Listen to fetal heart only", correct: false },
      { text: "Check vaginal discharge", correct: false },
      { text: "Measure maternal weight", correct: false },
    ],
  },
  {
    question: "When should a pregnant woman be referred for an ultrasound?",
    answers: [
      { text: "Only if she can afford it", correct: false },
      {
        text: "For dating, fetal anomalies, or high-risk conditions",
        correct: true,
      },
      { text: "At every ANC visit", correct: false },
      { text: "Never, it’s unnecessary", correct: false },
    ],
  },
  {
    question:
      "What is the danger sign that requires immediate referral in pregnancy?",
    answers: [
      { text: "Mild heartburn", correct: false },
      { text: "Severe vaginal bleeding", correct: true },
      { text: "Occasional Braxton Hicks contractions", correct: false },
      { text: "Light fetal movements at 20 weeks", correct: false },
    ],
  },
];

startScreenBtn.addEventListener("click", loadSecondScreen);
function loadSecondScreen() {
  startScreen.classList.remove("active");
  accountScreen.classList.add("active");
}

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = true;

totalqUestionSpan.textContent = midwiferyQuiz.length;
maxScore.textContent = midwiferyQuiz.length;

//start quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  showQuestions();
}

function showQuestions() {
  answerDisabled = false;
  const currentQuestion = midwiferyQuiz[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;

  //progress bar

  const progressBarPercentage =
    (currentQuestionIndex / midwiferyQuiz.length) * 100;
  progressBar.style.width = progressBarPercentage + "%";

  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswers);

    answerContainer.appendChild(button);
  });
}
function selectAnswers(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    if (button === selectedButton && !isCorrect) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < midwiferyQuiz.length) {
      showQuestions();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const userNameValue = userName.value.trim();
  const userEmailValue = userEmail.value.trim();
  usernameSpan.textContent = userNameValue.toUpperCase();
  useremailSpan.textContent = userEmailValue;
  resultScore.textContent = score;

  const resultPercentage = (score / midwiferyQuiz.length) * 100;

  if (resultPercentage >= 90) {
    resultMessage.textContent =
      "Perfect! Your clinical knowledge is outstanding! Ready for any delivery room challenge";
  } else if (resultPercentage >= 75) {
    resultMessage.textContent =
      "Good! You are a Competent Clinician!, Strong skills, but review postnatal care and PPH management.";
  } else if (resultPercentage >= 60) {
    resultMessage.textContent =
      "Fairly Good! Developing Practitioner. Keep reading and practicing!";
  } else {
    resultMessage.textContent =
      "You Need Urgent Improvement, Review FANC protocols, AMTSL, and neonatal resuscitation immediately";
  }

  userName.value = "";
  userEmail.value = "";
}
restartQuiz.addEventListener("click", startAgain);

function startAgain() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
