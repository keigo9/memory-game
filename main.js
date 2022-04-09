// card data
const cardsArray = [
  {
    name: "animaru1",
    img: "./assets/amamin.webp",
  },
  {
    name: "animaru2",
    img: "./assets/bis.webp",
  },
  {
    name: "animaru3",
    img: "./assets/bunjirou.webp",
  },
  {
    name: "animaru4",
    img: "./assets/hamukatu.webp",
  },
  {
    name: "animaru5",
    img: "./assets/jun.webp",
  },
  {
    name: "animaru6",
    img: "./assets/kamomi.webp",
  },
  {
    name: "animaru7",
    img: "./assets/marimo.webp",
  },
  {
    name: "animaru8",
    img: "./assets/maron.webp",
  },
  {
    name: "animaru9",
    img: "./assets/momoko.webp",
  },
  {
    name: "animaru10",
    img: "./assets/monja.webp",
  },
  {
    name: "animaru11",
    img: "./assets/oribiya.webp",
  },
  {
    name: "animaru12",
    img: "./assets/rennyu.webp",
  },
  {
    name: "animaru13",
    img: "./assets/sari.webp",
  },
  {
    name: "animaru14",
    img: "./assets/sumimomo.webp",
  },
  {
    name: "animaru15",
    img: "./assets/takeru.webp",
  },
  {
    name: "animaru16",
    img: "./assets/takoya.webp",
  },
  {
    name: "animaru17",
    img: "./assets/tatuo.webp",
  },
  {
    name: "animaru18",
    img: "./assets/sunday.webp",
  },
  {
    name: "animaru19",
    img: "./assets/rainy.webp",
  },
  {
    name: "animaru20",
    img: "./assets/julia.webp",
  },
  {
    name: "animaru21",
    img: "./assets/ozmond.webp",
  },
];


//game
const game = document.getElementById("game");

const grid = document.createElement("section");
grid.classList.add('grid');
game.appendChild(grid);


let gameGrid = shuffle(cardsArray).slice(0, 18);
gameGrid = shuffle(gameGrid.concat(gameGrid));

// Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    // 配列の数値を入れ替える
    [array[i], array[rand]] = [array[rand], array[i]]
  }
  return array;
}

gameGrid.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add('card', `${item.name}`);
  card.dataset.name = item.name;
  const front = document.createElement("div");
  front.classList.add("front");
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
})

// attempts count
let attemptCount = 0;
let attempts = document.querySelector(".count");
attempts.innerText = attemptCount;

var sec = 0;
var timeInSec;
let min = 0;

function secCount() {
  sec = sec + 1;
  document.querySelector(".sec-count").innerText = Math.floor(sec % 60);
  timeInSec = setTimeout(secCount, 1000);
  min = Math.floor(sec / 60);
  document.querySelector(".min-count").innerText = min;
}
var timeStarted = false;

// reset all attempts
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let confirmReset = confirm("Whole game will start again, continue to reset?");
  if (confirmReset === true) {
    window.location.reload();
  }
})

let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let count = 0;
let delay = 1000;

const match = () => {
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  })
}

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  })
}

grid.addEventListener("click", (event) => {
  !timeStarted && secCount();
  timeStarted = true;
  let clicked = event.target;
  attemptCount++;
  attempts.innerText = attemptCount;
  if (clicked.nodeName == "SECTION" || clicked === previousTarget || clicked.parentNode.classList.contains("selected")) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        // match();
        // resetGuesses();
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
        var matched = document.querySelectorAll(`.${firstGuess}`);
        matched.forEach(node => node.addEventListener('click', function (e) {
          e.stopPropagation();
        }))
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
  }

  previoutsTarget = clicked;
})