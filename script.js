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