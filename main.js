import './style.css'



const game = document.querySelector("#app");
const scoreDisplay = document.querySelector("#score");

const jeopardyCategories = [
  {
    genre: "WHO",
    questions: [
      {
        question: "Who wrote Harry Potter?",
        answers: ["RowLinkg", "King"],
        correct: "RowLinkg",
        level: "easy"
      },
      {
        question: "Who wrote Harry Potter2?",
        answers: ["RowLinkg2", "King2"],
        correct: "RowLinkg2",
        level: "medium"
      },
      {
        question: "Who wrote Harry Potter3?",
        answers: ["RowLinkg3", "King3"],
        correct: "RowLinkg3",
        level: "hard"
      }
    ]
  },
  {
    genre: "WHERE",
    questions: [
      {
        question: "Who wrote Harry Potter4?",
        answers: ["RowLinkg4", "King4"],
        correct: "RowLinkg4",
        level: "easy"
      },
      {
        question: "Who wrote Harry Potter5?",
        answers: ["RowLinkg5", "King5"],
        correct: "RowLinkg5",
        level: "medium"
      },
      {
        question: "Who wrote Harry Potter6?",
        answers: ["RowLinkg6", "King6"],
        correct: "RowLinkg6",
        level: "hard"
      }
    ]
  },
  {
    genre: "WHEN",
    questions: [
      {
        question: "Who wrote Harry Potter7?",
        answers: ["RowLinkg7", "King7"],
        correct: "RowLinkg7",
        level: "easy"
      },
      {
        question: "Who wrote Harry Potter8?",
        answers: ["RowLinkg8", "King8"],
        correct: "RowLinkg8",
        level: "medium"
      },
      {
        question: "Who wrote Harry Potter9?",
        answers: ["RowLinkg9", "King9"],
        correct: "RowLinkg9",
        level: "hard"
      }
    ]
  }
];

let score = 0;

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerText = category.genre;

  column.appendChild(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");

    column.append(card);

    if (question.level === "easy") {
      card.innerHTML = 100;
    }
    if (question.level === "medium") {
      card.innerHTML = 200;
    }
    if (question.level === "hard") {
      card.innerHTML = 300;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-correct", question.correct);
    card.setAttribute("data-answer-1", question.answers[0]);
    card.setAttribute("data-answer-2", question.answers[1]);
    card.setAttribute("data-value", card.getInnerHTML());

    card.addEventListener("click", flipCard);
  });
}

jeopardyCategories.forEach((category) => addCategory(category));

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "12px";
  const textDisplay = document.createElement("div");
  textDisplay.classList.add("card-text");
  textDisplay.innerHTML = this.getAttribute("data-question");
  const firstBtn = document.createElement("button");
  const secondBtn = document.createElement("button");

  firstBtn.classList.add("first-btn");
  secondBtn.classList.add("second-btn");

  firstBtn.innerHTML = this.getAttribute("data-answer-1");
  secondBtn.innerHTML = this.getAttribute("data-answer-2");
  firstBtn.addEventListener("click", getResult);
  secondBtn.addEventListener("click", getResult);

  this.append(textDisplay, firstBtn, secondBtn);

  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfButton = this.parentElement;
  if (cardOfButton.getAttribute("data-correct") == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstchild) {
        cardOfButton.removeChild(cardOfButton.lastchild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstchild) {
        cardOfButton.removeChild(cardOfButton.lastchild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", flipCard);
}
