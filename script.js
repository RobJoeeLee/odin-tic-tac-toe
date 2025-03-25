const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const playerOneInput = document.getElementById("player-one-input");
const playerTwoInput = document.getElementById("player-two-input");
const gameDisplay = document.getElementById("game-display");

const GameBoard = (function(){
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = function(){
        return board;
    }

    const updateBoard = function(index, marker){
        if(board[index] === ""){
            board[index] = marker;
            return true;
        }
        return false;
    };

    const resetBoard = function(){
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, resetBoard };
})();

const Player = function(name, marker){
    return { name, marker };
};

const GameController = (function(){
    let playerOne;
    let playerTwo;
    let currentPlayer;
    isGameOver = false;

    const startGame = function(nameOne = "Player 1", nameTwo = "Player 2"){
        playerOne = Player(nameOne, "X");
        playerTwo = Player(nameTwo, "O");
        currentPlayer = playerOne;
        isGameOver = false;
        GameBoard.resetBoard();
    };

    const switchTurn = function(){
        currentPlayer = currentPlayer === playerOne ? playerTwo: playerOne;
    };

    const checkWinner = function(){
        const board = GameBoard.getBoard();
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        for(let combo of winningCombos){
            const [a, b, c] = combo;
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                isGameOver = true;
                return `${currentPlayer.name} wins!`;
            }
            if(!board.includes("")){
                isGameOver = true;
                return "It's a draw";
            }
            return null;
        }
    };

    const playTurn = function(index){
        if(!isGameOver && GameBoard.updateBoard(index, currentPlayer.marker)){
            const result = checkWinner();
            if(result){
                console.log(result);
                return result;
            }
            switchTurn();
        }
        return null;
    };

    return { startGame, playTurn, getCurrentPlayer: () => currentPlayer};
})();

function createBoard(){
    gameContainer.innerHTML = "";

    for(let i = 0; i < 9; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;

        cell.addEventListener("click", handleCellClick)
        gameContainer.appendChild(cell);
    };
};