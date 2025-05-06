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

// Load saved progress from sessionStorage
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let finalScore = localStorage.getItem("score");

// Display questions
questions.forEach((q, index) => {
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<p>${q.question}</p>`;
  
  q.options.forEach(option => {
    const id = `q${index}_${option}`;
    const checked = savedProgress[index] === option ? "checked" : "";
    qDiv.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${option}" ${checked}>
        ${option}
      </label><br>
    `;
  });

  questionContainer.appendChild(qDiv);
});

// Update sessionStorage on selection
document.querySelectorAll("input[type='radio']").forEach(input => {
  input.addEventListener("change", (e) => {
    const [questionIndex] = e.target.name.match(/\d+/);
    savedProgress[questionIndex] = e.target.value;
    sessionStorage.setItem("progress", JSON.stringify(savedProgress));
  });
});

// Submit quiz
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) score++;
  });

  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Show score if already submitted
if (finalScore !== null) {
  scoreDisplay.textContent = `Your score is ${finalScore} out of ${questions.length}.`;
}
