class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draws: 0
        };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
        this.createParticles();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('current-player');
        this.resetButton = document.getElementById('reset-btn');
        this.newGameButton = document.getElementById('new-game-btn');
        this.playAgainButton = document.getElementById('play-again-btn');
        this.gameStatus = document.getElementById('game-status');
        this.statusMessage = document.getElementById('status-message');
        this.xScoreDisplay = document.getElementById('x-score');
        this.oScoreDisplay = document.getElementById('o-score');
        this.drawScoreDisplay = document.getElementById('draw-score');
        
        this.addEventListeners();
        this.updateDisplay();
        this.updateScoreDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.newGameButton.addEventListener('click', () => this.newGame());
        this.playAgainButton.addEventListener('click', () => this.playAgain());
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    handleKeyPress(e) {
        if (!this.gameActive) return;
        
        const keyMap = {
            '1': 0, '2': 1, '3': 2,
            '4': 3, '5': 4, '6': 5,
            '7': 6, '8': 7, '9': 8
        };
        
        if (keyMap.hasOwnProperty(e.key)) {
            this.handleCellClick(keyMap[e.key]);
        }
        
        if (e.key === 'r' || e.key === 'R') {
            this.resetGame();
        }
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateCellDisplay(index);
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
            this.updateDisplay();
        }
    }
    
    updateCellDisplay(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add('taken');
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        // Add animation
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 50);
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCells = condition;
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.highlightWinningCells();
        this.showGameStatus(`Player ${this.currentPlayer} Wins! 🎉`);
        this.updateScoreDisplay();
        this.celebrate();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.scores.draws++;
        this.showGameStatus("It's a Draw! 🤝");
        this.updateScoreDisplay();
    }
    
    highlightWinningCells() {
        this.winningCells.forEach(index => {
            this.cells[index].classList.add('winning-cell');
        });
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateDisplay() {
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.statusDisplay.style.animation = 'none';
        setTimeout(() => {
            this.statusDisplay.style.animation = 'pulse 2s infinite';
        }, 50);
    }
    
    updateScoreDisplay() {
        this.xScoreDisplay.textContent = this.scores.X;
        this.oScoreDisplay.textContent = this.scores.O;
        this.drawScoreDisplay.textContent = this.scores.draws;
    }
    
    showGameStatus(message) {
        this.statusMessage.textContent = message;
        this.gameStatus.classList.remove('hidden');
    }
    
    hideGameStatus() {
        this.gameStatus.classList.add('hidden');
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCells = [];
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken', 'x', 'o', 'winning-cell');
            cell.style.transform = 'scale(1)';
        });
        
        this.updateDisplay();
        this.hideGameStatus();
    }
    
    newGame() {
        this.resetGame();
        this.scores = { X: 0, O: 0, draws: 0 };
        this.updateScoreDisplay();
    }
    
    playAgain() {
        this.resetGame();
    }
    
    celebrate() {
        // Create celebration particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createCelebrationParticle();
            }, i * 50);
        }
    }
    
    createCelebrationParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 10000);
        };
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 200);
        }
        
        // Continuously create new particles
        setInterval(createParticle, 400);
    }
}

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}