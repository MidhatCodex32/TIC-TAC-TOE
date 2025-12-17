// Game state
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameActive = true;

// DOM Elements
const turnLabel = document.getElementById('turnLabel');
const gameBoard = document.getElementById('gameBoard');
const resetBtn = document.getElementById('resetBtn');
const resultModal = document.getElementById('resultModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');

// Colors
const colors = {
    bg: '#1e1e1e',
    x: '#4CAF50',
    o: '#E53935',
    draw: '#FFC107'
};

// Initialize game board
function initBoard() {
    gameBoard.innerHTML = '';
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const cell = document.createElement('button');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => cellClick(r, c));
            gameBoard.appendChild(cell);
        }
    }
}

// Cell click handler
function cellClick(r, c) {
    if (!gameActive || board[r][c] !== '') return;
    
    board[r][c] = currentPlayer;
    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;
    
    const winner = checkWinner();
    
    if (winner) {
        gameActive = false;
        if (winner === 'Draw') {
            showResult('DRAW!', 'Match ended in a draw.', colors.draw);
        } else {
            const color = winner === 'X' ? colors.x : colors.o;
            showResult('WINNER!', `Player ${winner} Wins!`, color);
        }
        disableAllCells();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnLabel.textContent = `Turn: ${currentPlayer}`;
    }
}

// Check for winner
function checkWinner() {
    // Check rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] && board[r][0] === board[r][1] && board[r][0] === board[r][2]) {
            return board[r][0];
        }
    }
    
    // Check columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] && board[0][c] === board[1][c] && board[0][c] === board[2][c]) {
            return board[0][c];
        }
    }
    
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return board[0][2];
    }
    
    // Check for draw
    let isDraw = true;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === '') {
                isDraw = false;
                break;
            }
        }
    }
    
    return isDraw ? 'Draw' : null;
}

// Disable all cells
function disableAllCells() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

// Show result modal
function showResult(title, message, color) {
    modalTitle.textContent = title;
    modalTitle.style.color = color;
    modalMessage.textContent = message;
    resultModal.style.display = 'flex';
}

// Reset game
function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameActive = true;
    turnLabel.textContent = 'Turn: X';
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o');
    });
    
    resultModal.style.display = 'none';
}

// Event Listeners
resetBtn.addEventListener('click', resetGame);
modalBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
});

// Initialize game
initBoard();