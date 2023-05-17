const gameBoard = document.querySelector("#gameBoard");
const infoDisplay = document.querySelector("#info");
const newGame = document.querySelector("button");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
let circleWins = false;
let crossWins = false;
infoDisplay.textContent = "Circle goes first!!!";

function createBoard() {
	startCells.forEach((_cell, index) => {
		const cellElement = document.createElement("div");
		cellElement.classList.add("square");
		cellElement.id = index;
		cellElement.addEventListener("click", addGo);
		gameBoard.append(cellElement);
	});
}
createBoard();

newGame.addEventListener("click", () => {
	resetGame();
});

function resetGame() {
  circleWins = false;
  crossWins = false;
	const allSquares = document.querySelectorAll(".square");
	allSquares.forEach((square) => {
		square.innerHTML = "";
		square.addEventListener("click", addGo);
		go = "circle";
		infoDisplay.textContent = "Circle goes first!!!";
	});
}

function addGo(e) {
	const goDisplay = document.createElement("div");
	goDisplay.classList.add(go);
	e.target.append(goDisplay);
	go = go === "circle" ? "cross" : "circle";
	infoDisplay.textContent = `It is now ${go}'s go.`;
	e.target.removeEventListener("click", addGo);
	checkScore();
}
function disableClicks() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => square.removeEventListener("click", addGo));
}
function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

	winningCombos.forEach((array) => {
        circleWins = array.every((cell) => {
            const firstChild = allSquares[cell].firstChild;
            return firstChild && firstChild.classList.contains("circle");
        });

        if (circleWins) {
            infoDisplay.textContent = "Circle wins!";
            disableClicks();
        }

        crossWins = array.every((cell) => {
            const firstChild = allSquares[cell].firstChild;
            return firstChild && firstChild.classList.contains("cross");
        });

        if (crossWins) {
            infoDisplay.textContent = "Cross wins!";
            disableClicks();
        }
    });
    
    let draw = [...allSquares].every((square) => {
      const firstChild = square.firstChild;
      return firstChild && (firstChild.classList.contains("circle") || firstChild.classList.contains("cross"));
    });

    if (draw && !circleWins && !crossWins) {
      infoDisplay.textContent = "Draw!";
      disableClicks();
    }
}
