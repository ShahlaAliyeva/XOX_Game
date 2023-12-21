let playingArr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const playAreas = document.querySelectorAll(".grid-container .playground");
let playerOrder = document.querySelector("h1");

let winnerNumber = 0;
let equality = true;
let isFirstUserOrder = true;
let equalityObj = {};

playAreas.forEach((playingArea, index) => {
  playingArea.id = index + 1;
  playingArea.addEventListener("click", function (e) {
    changeArray(e.target.id, isFirstUserOrder);
    writeXOX(isFirstUserOrder, playingArea);
    checkWinner(playingArr);
    findWhoseOrder(isFirstUserOrder);
  });
});

function writeXOX(firstOrder, playArea) {
  if (playArea.textContent === "" && winnerNumber === 0) {
    if (firstOrder) {
      playArea.textContent = "X";
      isFirstUserOrder = false;
    } else {
      playArea.textContent = "O";
      isFirstUserOrder = true;
    }
  }
}

function findWhoseOrder(isFirst) {
  if (isFirst) {
    playerOrder.firstElementChild.textContent = "First player";
    playerOrder.lastElementChild.textContent = "X";
  } else {
    playerOrder.firstElementChild.textContent = "Second player";
    playerOrder.lastElementChild.textContent = "O";
  }
}
findWhoseOrder(isFirstUserOrder);

function changeArray(clcikcedID, isFirstUser) {
  const len = playingArr.length;
  if (clcikcedID <= len) {
    if (isFirstUser) {
      playingArr[0][clcikcedID - 1] = 1;
    } else {
      playingArr[0][clcikcedID - 1] = 2;
    }
  } else if (clcikcedID - len <= len) {
    if (isFirstUser) {
      playingArr[1][clcikcedID - len - 1] = 1;
    } else {
      playingArr[1][clcikcedID - len - 1] = 2;
    }
  } else {
    if (isFirstUser) {
      playingArr[2][clcikcedID - len * 2 - 1] = 1;
    } else {
      playingArr[2][clcikcedID - len * 2 - 1] = 2;
    }
  }
}

function checkWinner(playingArray) {
  playingArray[0].forEach((element, index) => {
    rowChecker(0, element, index, playingArray);
  });
  playingArray[1].forEach((element, index) => {
    rowChecker(1, element, index, playingArray);
  });
  playingArray[2].forEach((element, index) => {
    rowChecker(2, element, index, playingArray);
  });
  columnChecker(0, 0, playingArray);

  columnChecker(0, 1, playingArray);

  columnChecker(0, 2, playingArray);

  if (
    playingArray[0][0] === playingArray[1][1] &&
    playingArray[1][1] === playingArray[2][2] &&
    playingArray[0][0]
  ) {
    equality = false;
    winnerNumber = playingArray[0][0];
  }
  if (
    playingArray[0][playingArray.length - 1] === playingArray[1][1] &&
    playingArray[1][1] === playingArray[2][0] &&
    playingArray[0][playingArray.length - 1]
  ) {
    equality = false;
    winnerNumber = playingArray[0][playingArray.length - 1];
  }
  console.log(playingArray);
  showWinner(winnerNumber, equality);
}

function rowChecker(rowNum, element, index, array) {
  if (
    element === array[rowNum][index + 1] &&
    array[rowNum][index + 1] === array[rowNum][index + 2] &&
    element !== 0
  ) {
    equality = false;
    winnerNumber = element;
  }
}

function columnChecker(row, col, array) {
  if (
    array[row][col] === array[row + 1][col] &&
    array[row + 1][col] === array[row + 2][col] &&
    array[row][col]
  ) {
    equality = false;
    winnerNumber = array[row][col];
  }
}

function showWinner(winnerNumber, equality) {
  const playArray = playingArr.map((arr, index) =>
    arr.filter((playArea) => playArea !== 0)
  );
  playArray.forEach((array, i) => {
    equalityObj[`${i}`] = [...array];
  });

  const modal = document.querySelector(".modal");
  const modalBg = document.querySelector(".modal-bg");
  const winnerName = modal.querySelector("p span");
  const playagainBtn = modal.querySelector("button");
  if (winnerNumber !== 0) {
    modal.classList.add("open");
    modalBg.style.display = "block";

    if (winnerNumber === 1) {
      winnerName.textContent = "First player";
    } else {
      winnerName.textContent = "Second player";
    }
  }

  if (
    equalityObj[0].length === 3 &&
    equalityObj[1].length === 3 &&
    equalityObj[2].length === 3 &&
    equality
  ) {
    const modalTitle = modal.querySelector("h2");
    modal.classList.add("open");
    modalBg.style.display = "block";
    modalTitle.textContent = "Equality";
    winnerName.parentElement.textContent = "Nobody wins!";
  }
  playagainBtn.addEventListener("click", function () {
    window.location.reload();
  });
}
