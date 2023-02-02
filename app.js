const rulesBtn = document.querySelector(".rulesBtn");
const rulesModal = document.querySelector(".rulesModal");
const resultModal = document.querySelector(".resultModal");
const resultMsgAndBtn = document.querySelector(".resultMsgAndBtn");
const closeBtnMob = document.querySelector(".closeBtnMob");
const closeBtnDesk = document.querySelector(".closeBtnDesk");
const btnsAndPentagon = document.querySelector(".buttonsAndPentagon");
const gameBtns = document.querySelectorAll(".btnCont");
const btnPicks = document.querySelector(".btnPicks");
const resultMsg = document.querySelector(".resultMsg");
const playAgainBtn = document.querySelector(".playAgainBtn");
const score = document.querySelector(".scoreNum");
const backdrop = document.querySelector(".backdrop");
const emptySlot = document.querySelector(".emptySlot");
let userPick;
let computerPick;
let userLabel;
let computerLabel;
const getComputerPick = () => {
  return gameBtns[Math.floor(Math.random() * gameBtns.length)].cloneNode(true);
};

const rules = {
  scissorsBeats: ["paper", "lizard"],
  paperBeats: ["rock", "spock"],
  rockBeats: ["lizard", "scissors"],
  lizardBeats: ["spock", "paper"],
  spockBeats: ["scissors", "rock"],
};

window.addEventListener("click", (e) => {
  if (e.target === rulesBtn) {
    rulesModal.classList.add("show");
    backdrop.classList.add("show");
  } else if (e.target === closeBtnMob ||e.target === closeBtnDesk) {
    rulesModal.classList.remove("show");
    backdrop.classList.remove("show");

  }else if (e.target === backdrop) {
    rulesModal.classList.remove("show");
    backdrop.classList.remove("show");

  } 
  else if (e.target === playAgainBtn) {
    userPick.remove();
    computerPick.remove();
    resultModal.classList.remove("show");
    btnsAndPentagon.classList.remove("hide");
    resultMsgAndBtn.classList.remove("show");
    emptySlot.classList.remove("hide");
    btnPicks.classList.remove('separate');

    for(let button of gameBtns){
      button.classList.toggle('hasActive');
    }
  }
});

for (let btn of gameBtns) {
  btn.addEventListener("click", () => {
    for(let button of gameBtns){
      button.classList.toggle('hasActive');
    }
    btnsAndPentagon.classList.add("hide");

    userPick = btn.cloneNode(true);
    userPick.classList.add("userPick");
    userPick.style.cursor = "default";

    computerPick = getComputerPick();
    computerPick.classList.add("computerPick");
    computerPick.style.cursor = "default";

    btnPicks.children[0].appendChild(userPick);
    btnPicks.children[1].appendChild(computerPick);

    resultModal.classList.add("show");

    setTimeout(() => {
      computerPick.classList.add("show");
      emptySlot.classList.add("hide");
      btnPicks.classList.add('separate')
      
      findWinner(userPick, computerPick);
    }, 500);

    setTimeout(() => {
      resultMsgAndBtn.classList.add("show");
    }, 1500);
  });
}

const findWinner = (pl1, pl2) => {
  if (pl1.id === pl2.id) {
    resultMsg.innerText = "Draw";
    setTimeout(() => {
      pl2.classList.add("winnerHalo");
      pl1.classList.add("winnerHalo");
    }, 800);
  } else if (rules[pl1.id + "Beats"].includes(pl2.id)) {
    resultMsg.innerText = "You Win";
    score.innerText = parseInt(score.innerText) + 1;

    setTimeout(() => {
      pl1.classList.add("winnerHalo");
    }, 800);
  } else {
    resultMsg.innerText = "You Lose";
    score.innerText = parseInt(score.innerText) - 1;
    if (parseInt(score.innerText) < 0) {
      score.innerText = "0";
    }

    setTimeout(() => {
      pl2.classList.add("winnerHalo");
    }, 800);
  }
};
