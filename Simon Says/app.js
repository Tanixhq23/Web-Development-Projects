let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

// Info: Start the game with keypress

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
  }
});

// Info: Random button flash and level updation

let h2 = document.querySelector("h2");

function levelUp() {
  userSeq = [];
  level++;
  highestScore++;
  h2.innerText = `Level: ${level}`;

  // Info: Random Button
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randombtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  gameFlash(randombtn);
  if (level > highestScore) {
    highestScore = level;
    document.querySelector("h3").innerText = `Highest Score: ${highestScore}`;
  }
}

let btn = document.querySelector("button");

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Info: Button Press and Matching Sequence

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 600);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b>, Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    document.querySelector("h3").innerText = `Highest Score: ${highestScore}`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Info: Game restart
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
