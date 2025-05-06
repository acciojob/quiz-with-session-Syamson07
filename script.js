const questions = [
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Everest", "Kilimanjaro", "Makalu"],
    answer: "Everest"
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

// Render questions and answers
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
    if (savedProgress[index] === option) {
      input.checked = true; // Use property instead of HTML attribute
    }

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

// Calculate and display score
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) score++;
  });

  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Show previous score if it exists
if (finalScore !== null) {
  scoreDisplay.textContent = `Your score is ${finalScore} out of ${questions.length}.`;
}
