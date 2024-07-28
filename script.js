const currentPlayer = document.querySelector(".currentPlayer");
const endGame = document.querySelector(".endGame");
const cells = document.querySelectorAll(".board-cell");
const msg = document.querySelector(".endGame-msg")

let board = ['','','','','','','','',''];

let gameActive = true

let player = 'x';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function newMove(index){
    if(gameActive == true){
        board[index] = player;
        let id = index+1;
        const cell = document.getElementById('cell-'+id);
        cell.classList.add(player);
        cell.removeAttribute('onclick');
        if(checkWinning(player)){
            if(player == "x"){
                turn = "X";
            }else{
                turn = "O";
            }
            currentPlayer.style.display = 'none';
            msg.innerHTML = `${turn} VENCEU`;
            endGame.style.display = 'flex';
            cells.forEach(element => {
                element.removeAttribute('onclick')
            });
        } else if(boardFull()){
            currentPlayer.style.display = 'none';
            msg.innerHTML = `EMPATE`;
            endGame.style.display = 'flex';
        } else {
            player = player === "x" ? "circle" : "x";
            let turn;
            if(player == "x"){
                turn = "X";
            }else{
                turn = "O";
            }
            currentPlayer.innerHTML = `JOGADOR DA VEZ: ${turn}`;
        }
    }
}

function checkWinning(symbol) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination
        if (board[a] == symbol && (board[a] === board[b]) && (board[a] === board[c])) {
            return true;
        }
    }

    return false;
}

function boardFull() {
    return board.every(cell => cell !== '');
}

function restartGame(){
    for(i = 0; i < 9; i++){
        cells[i].setAttribute('onclick', `newMove(${i})`);
        cells[i].classList.remove('x', 'circle');
    }
    currentPlayer.style.display = 'flex';
    endGame.style.display = 'none';
    board = ['','','','','','','','',''];
    player = player === "x" ? "circle" : "x";
    let turn;
    if(player == "x"){
        turn = "X";
    }else{
        turn = "O";
    }
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${turn}`;
}



