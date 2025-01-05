let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],             // they are winning patterns they are used to analyse the activity of winning pattern can occur in tic tac toe game
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;     // reset the turn of player
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");        // hide the message container
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {        // desable other boxes when win 3 is found,
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {           // enable all boxes when game is reset
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;      // display winner when for loop found an winning condition
  msgContainer.classList.remove("hide");
  disableBoxes();                           // disable other boxes when win 3 is found,
};

const checkWinner = () => {
  for (let pattern of winPatterns) {                              // check all winning patterns
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {              // if all 3 positions are filled with same value
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);                                    // show winner
        return true;                               // return true to stop further checks
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);    // it occured wghen reset game is clicked and call the reset game function
resetBtn.addEventListener("click", resetGame);        // it occured wghen reset game is clicked and call the reset game function