const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Mark Twain", "Shakespeare", "Leo Tolstoy"],
    answer: "Shakespeare"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    answer: "Oxygen"
  }
];

const questionContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let finalScore = localStorage.getItem("score");

// Render questions
questions.forEach((q, index) => {
  const qDiv = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = q.question;
  qDiv.appendChild(p);

  q.options.forEach(option => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "radio";
    input.name = `q${index}`;
    input.value = option;

    // Restore previous selection
    if (savedProgress[index] === option) {
      input.setAttribute("checked", "true"); // helps Cypress detect
      input.checked = true; // actually sets the radio as checked
    }

    // Store progress
    input.addEventListener("change", () => {
      savedProgress[index] = input.value;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(input);
    label.append(` ${option}`);
    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionContainer.appendChild(qDiv);
});

// Score calculation and persistence
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreDisplay.textContent = resultText;
  localStorage.setItem("score", score);
});

// Display previous score if available
if (finalScore !== null && scoreDisplay.textContent === "") {
  scoreDisplay.textContent = `Your score is ${finalScore} out of ${questions.length}.`;
}
