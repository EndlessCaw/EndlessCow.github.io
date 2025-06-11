// Available pieces for the game
const ALL_PIECES = [
    "Pawn", "Rook", "Knight", "Bishop", "Queen", "King",
    "Archer", "Mage", "Dragon", "Elephant", "Cannon", "Assassin",
    "Guard", "Spy", "Healer", "Jester", "Phoenix", "Griffin"
];

// Game state
let gameState = {
    player1: {
        name: "Player 1",
        bet: 0,
        pieces: []
    },
    player2: {
        name: "Player 2",
        bet: 0,
        pieces: []
    },
    currentRound: 1,
    setA: [],
    setB: [],
    betsRevealed: false
};

// DOM elements
const setupScreen = document.getElementById('setup-screen');
const draftScreen = document.getElementById('draft-screen');
const startDraftBtn = document.getElementById('start-draft');
const revealBetsBtn = document.getElementById('reveal-bets');
const nextRoundBtn = document.getElementById('next-round');
const chooseSetABtn = document.getElementById('choose-set-a');
const chooseSetBBtn = document.getElementById('choose-set-b');

// Initialize the application
function init() {
    startDraftBtn.addEventListener('click', startDraft);
    revealBetsBtn.addEventListener('click', revealBets);
    chooseSetABtn.addEventListener('click', () => selectSet('A'));
    chooseSetBBtn.addEventListener('click', () => selectSet('B'));
    nextRoundBtn.addEventListener('click', nextRound);
}

// Start the draft process
function startDraft() {
    // Get player names and round number
    gameState.player1.name = document.getElementById('player1-name').value || "Player 1";
    gameState.player2.name = document.getElementById('player2-name').value || "Player 2";
    gameState.currentRound = parseInt(document.getElementById('draft-round').value) || 1;
    
    // Update display names
    document.getElementById('player1-name-display').textContent = gameState.player1.name;
    document.getElementById('player2-name-display').textContent = gameState.player2.name;
    document.getElementById('current-round').textContent = gameState.currentRound;
    
    // Generate random sets
    generateRandomSets();
    
    // Show the draft screen
    setupScreen.classList.add('hidden');
    draftScreen.classList.remove('hidden');
    
    // Reset bets
    gameState.player1.bet = 0;
    gameState.player2.bet = 0;
    document.getElementById('player1-bet-amount').value = "0";
    document.getElementById('player2-bet-amount').value = "0";
    document.getElementById('player1-bet').classList.remove('hidden');
    document.getElementById('player2-bet').classList.remove('hidden');
    
    // Show betting phase
    document.getElementById('betting-phase').classList.remove('hidden');
    document.getElementById('results-phase').classList.add('hidden');
    document.getElementById('player2-bet').classList.add('hidden');
}

// Generate two random sets of pieces
function generateRandomSets() {
    // Shuffle all pieces
    const shuffled = [...ALL_PIECES].sort(() => 0.5 - Math.random());
    
    // Take first 3-5 pieces for each set (random number in this range)
    const setSize = 3 + Math.floor(Math.random() * 3);
    gameState.setA = shuffled.slice(0, setSize);
    gameState.setB = shuffled.slice(setSize, setSize * 2);
    
    // Display the sets
    displaySets();
}

// Display the generated sets
function displaySets() {
    const setAElement = document.getElementById('set-a');
    const setBElement = document.getElementById('set-b');
    
    setAElement.innerHTML = '';
    setBElement.innerHTML = '';
    
    gameState.setA.forEach(piece => {
        const li = document.createElement('li');
        li.textContent = piece;
        setAElement.appendChild(li);
    });
    
    gameState.setB.forEach(piece => {
        const li = document.createElement('li');
        li.textContent = piece;
        setBElement.appendChild(li);
    });
}

// Reveal the bets and determine winner
function revealBets() {
    // Get bets from inputs
    gameState.player1.bet = parseInt(document.getElementById('player1-bet-amount').value) || 0;
    gameState.player2.bet = parseInt(document.getElementById('player2-bet-amount').value) || 0;
    
    // Hide both betting inputs
    document.getElementById('player1-bet').classList.add('hidden');
    document.getElementById('player2-bet').classList.add('hidden');
    
    // Determine winner
    let winner, loser;
    if (gameState.player1.bet > gameState.player2.bet) {
        winner = gameState.player1;
        loser = gameState.player2;
    } else if (gameState.player2.bet > gameState.player1.bet) {
        winner = gameState.player2;
        loser = gameState.player1;
    } else {
        // Tie - random winner
        const random = Math.random() > 0.5;
        winner = random ? gameState.player1 : gameState.player2;
        loser = random ? gameState.player2 : gameState.player1;
    }
    
    // Display results
    const resultsElement = document.getElementById('bet-results');
    resultsElement.innerHTML = `
        <p><strong>${gameState.player1.name}</strong> bet: ${gameState.player1.bet}</p>
        <p><strong>${gameState.player2.name}</strong> bet: ${gameState.player2.bet}</p>
        <p><strong>${winner.name}</strong> wins the bidding and chooses first!</p>
    `;
    
    // Show results phase
    document.getElementById('betting-phase').classList.add('hidden');
    document.getElementById('results-phase').classList.remove('hidden');
    
    // Show set selection if there's a winner
    document.getElementById('set-selection').classList.remove('hidden');
    document.getElementById('winner-name').textContent = winner.name;
    
    // Store winner in game state
    gameState.bettingWinner = winner;
    gameState.bettingLoser = loser;
    gameState.betsRevealed = true;
}

// Handle set selection
function selectSet(selectedSet) {
    const winner = gameState.bettingWinner;
    const loser = gameState.bettingLoser;
    
    // Assign sets to players
    if (selectedSet === 'A') {
        winner.pieces.push(...gameState.setA);
        loser.pieces.push(...gameState.setB);
    } else {
        winner.pieces.push(...gameState.setB);
        loser.pieces.push(...gameState.setA);
    }
    
    // Display final results
    const finalResults = document.getElementById('final-results');
    finalResults.innerHTML = `
        <p><strong>${winner.name}</strong> receives: ${selectedSet === 'A' ? 'Set A' : 'Set B'}</p>
        <p><strong>${loser.name}</strong> receives: ${selectedSet === 'A' ? 'Set B' : 'Set A'}</p>
        <p>All bets are lost (${gameState.player1.bet + gameState.player2.bet} total).</p>
    `;
    finalResults.classList.remove('hidden');
    
    // Hide selection buttons
    document.getElementById('set-selection').classList.add('hidden');
    
    // Show next round button
    nextRoundBtn.classList.remove('hidden');
}

// Prepare for next round
function nextRound() {
    gameState.currentRound++;
    startDraft();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);