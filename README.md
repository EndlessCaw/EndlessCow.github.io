<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Piece Draft</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            width: 100%;
            max-width: 900px;
            background: rgba(0, 15, 30, 0.85);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid rgba(255, 215, 0, 0.3);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
            color: #FFD700;
        }
        
        h2 {
            font-size: 1.8rem;
            margin: 20px 0 15px;
            color: #4FC3F7;
        }
        
        h3 {
            font-size: 1.4rem;
            margin: 15px 0 10px;
            color: #81C784;
        }
        
        .screen {
            display: none;
            animation: fadeIn 0.5s ease-out;
        }   
        
        .active {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4FC3F7;
        }
        
        input[type="text"],
        input[type="number"] {
            width: 100%;
            padding: 12px 15px;
            background: rgba(0, 30, 60, 0.7);
            border: 1px solid rgba(100, 150, 255, 0.3);
            border-radius: 8px;
            color: white;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        input[type="text"]:focus,
        input[type="number"]:focus {
            outline: none;
            border-color: #4FC3F7;
            box-shadow: 0 0 0 2px rgba(79, 195, 247, 0.3);
        }
        
        .sets-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin: 30px 0;
        }
        
        .piece-set {
            flex: 1;
            border: 2px solid rgba(255, 215, 0, 0.3);
            padding: 20px;
            border-radius: 10px;
            background: rgba(0, 20, 40, 0.7);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s;
        }
        
        .piece-set:hover {
            transform: translateY(-5px);
        }
        
        .piece-set h3 {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 215, 0, 0.2);
        }
        
        .piece-set ul {
            list-style-type: none;
        }
        
        .piece-set li {
            padding: 10px 15px;
            margin: 8px 0;
            background: rgba(30, 70, 120, 0.5);
            border-radius: 6px;
            border-left: 4px solid #FFD700;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .player-bet {
            margin: 20px 0;
            padding: 20px;
            background: rgba(0, 30, 60, 0.6);
            border-radius: 10px;
            border-left: 4px solid #4FC3F7;
        }
        
        .player-bet.player1 {
            border-left-color: #FF5252;
        }
        
        .player-bet.player2 {
            border-left-color: #66BB6A;
        }
        
        .btn {
            display: inline-block;
            background: linear-gradient(to right, #FF8E53, #FE6B8B);
            color: white;
            border: none;
            padding: 12px 25px;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            margin: 10px 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
        }
        
        .btn:active {
            transform: translateY(1px);
        }
        
        .btn-primary {
            background: linear-gradient(to right, #2193b0, #6dd5ed);
        }
        
        .btn-success {
            background: linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6);
        }
        
        .btn-warning {
            background: linear-gradient(to right, #f46b45, #eea849);
        }
        
        .btn-danger {
            background: linear-gradient(to right, #ff416c, #ff4b2b);
        }
        
        .btn:disabled {
            background: #555;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .bet-controls {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
        }
        
        .bet-amount {
            font-size: 1.3rem;
            font-weight: bold;
            color: #FFD700;
            margin-left: 10px;
        }
        
        .results-container {
            background: rgba(0, 40, 80, 0.7);
            border-radius: 10px;
            padding: 25px;
            margin: 25px 0;
            border: 2px solid rgba(79, 195, 247, 0.3);
        }
        
        .player-result {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin: 15px 0;
            background: rgba(0, 30, 60, 0.5);
            border-radius: 8px;
        }
        
        .player1-result {
            border-left: 4px solid #FF5252;
        }
        
        .player2-result {
            border-left: 4px solid #66BB6A;
        }
        
        .piece-badge {
            display: inline-block;
            background: rgba(255, 215, 0, 0.2);
            padding: 5px 10px;
            border-radius: 15px;
            margin: 3px;
            font-size: 0.9rem;
        }
        
        .instructions {
            background: rgba(0, 20, 40, 0.6);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #FFD700;
        }
        
        .instructions ul {
            padding-left: 20px;
            margin: 10px 0;
        }
        
        .instructions li {
            margin-bottom: 8px;
        }
        
        .hidden {
            display: none;
        }
        
        .status-bar {
            display: flex;
            justify-content: space-between;
            background: rgba(0, 30, 60, 0.7);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .round-display {
            font-size: 1.2rem;
            font-weight: bold;
            color: #FFD700;
        }
        
        .player-indicator {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .player1-indicator {
            background: rgba(255, 82, 82, 0.3);
            color: #FF5252;
        }
        
        .player2-indicator {
            background: rgba(102, 187, 106, 0.3);
            color: #66BB6A;
        }
        
        .confirmation {
            padding: 10px;
            margin-top: 10px;
            background: rgba(46, 204, 113, 0.2);
            border-radius: 6px;
            text-align: center;
            font-weight: bold;
            color: #2ecc71;
            display: none;
        }
        
        .set-selection {
            text-align: center;
            margin: 25px 0;
        }
        
        .set-btn {
            min-width: 150px;
            margin: 10px;
        }
        
        .final-results {
            background: rgba(46, 204, 113, 0.15);
            border: 2px solid rgba(46, 204, 113, 0.4);
            border-radius: 10px;
            padding: 20px;
            margin-top: 25px;
        }
        
        .hidden-bet {
            color: transparent;
            text-shadow: 0 0 8px rgba(0,0,0,0.5);
        }
        
        .hidden-bet::selection {
            color: transparent;
            background: transparent;
        }

        .balance-display {
            font-size: 1.2rem;
            margin: 10px 0;
            padding: 10px;
            background: rgba(0, 40, 80, 0.6);
            border-radius: 8px;
            border-left: 4px solid #FFD700;
        }
        
        .balance-amount {
            font-weight: bold;
            color: #FFD700;
        }
        
        .invalid-bet {
            color: #FF5252;
            font-size: 0.9rem;
            margin-top: 5px;
            display: none;
        }
        
        @media (max-width: 768px) {
            .sets-container {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                margin: 10px 0;
            }
            
            .bet-controls {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Game Piece Draft</h1>
            <p>Strategic bidding for powerful chess-like pieces</p>
        </header>
        
        <!-- Setup Screen -->
        <div id="setup-screen" class="screen active">
            <div class="instructions">
                <h3>How the Draft Works:</h3>
                <ul>
                    <li>Each draft round, two random sets of pieces are generated</li>
                    <li>Players take turns entering their bids (hidden from each other)</li>
                    <li>The player with the higher bid chooses which set to take</li>
                    <li>The other player gets the remaining set</li>
                    <li>All bids are lost regardless of the outcome</li>
                </ul>
            </div>
            
            <h2>Game Setup</h2>
            <div class="form-group">
                <label for="player1-name">Player 1 Name:</label>
                <input type="text" id="player1-name" value="Player 1">
            </div>
            <div class="form-group">
                <label for="player2-name">Player 2 Name:</label>
                <input type="text" id="player2-name" value="Player 2">
            </div>
            <div class="form-group">
                <label for="draft-round">Draft Round:</label>
                <input type="number" id="draft-round" min="1" value="1">
            </div>
            <button id="start-draft" class="btn btn-primary">Start Draft</button>
        </div>
        
        <!-- Draft Screen -->
        <div id="draft-screen" class="screen">
            <div class="status-bar">
                <div class="round-display">Draft Round: <span id="current-round">1</span></div>
                <div class="player-turn">Current Turn: <span id="current-player" class="player-indicator player1-indicator">Player 1</span></div>
            </div>
            
            <h2>Available Piece Sets</h2>
            <div class="sets-container">
                <div class="piece-set">
                    <h3>Set A</h3>
                    <ul id="set-a"></ul>
                </div>
                <div class="piece-set">
                    <h3>Set B</h3>
                    <ul id="set-b"></ul>
                </div>
            </div>
            
            <div id="betting-phase">
                <h2>Place Your Bets</h2>
                
                <!-- Player 1 Bet -->
                <div class="player-bet player1">
                    <h3><span id="player1-name-display">Player 1</span>'s Bet</h3>
                    <div class="balance-display">Balance: <span id="player1-balance" class="balance-amount">100</span> chips</div>
                    <p>Enter your bid amount. Your opponent won't see this until bids are revealed.</p>
                    <div class="bet-controls">
                        <input type="number" id="player1-bet-amount" min="0" value="0">
                        <button id="confirm-player1-bet" class="btn btn-warning">Confirm Bet</button>
                    </div>
                    <div id="player1-bet-error" class="invalid-bet">You don't have enough chips!</div>
                    <div id="player1-confirmation" class="confirmation">Bet confirmed!</div>
                    <div id="player1-bet-display" class="hidden-bet"></div>
                </div>
                
                <div id="player2-bet-section" class="player-bet player2 hidden">
                    <h3><span id="player2-name-display">Player 2</span>'s Bet</h3>
                    <div class="balance-display">Balance: <span id="player2-balance" class="balance-amount">100</span> chips</div>
                    <p>Enter your bid amount. Your opponent won't see this until bids are revealed.</p>
                    <div class="bet-controls">
                        <input type="number" id="player2-bet-amount" min="0" value="0">
                        <button id="confirm-player2-bet" class="btn btn-warning">Confirm Bet</button>
                    </div>
                    <div id="player2-bet-error" class="invalid-bet">You don't have enough chips!</div>
                    <div id="player2-confirmation" class="confirmation">Bet confirmed!</div>
                    <div id="player2-bet-display" class="hidden-bet"></div>
                </div>
                
                <div class="text-center">
                    <button id="reveal-bets" class="btn btn-success" disabled>Reveal Bets</button>
                </div>
            </div>
            
            <div id="results-phase" class="hidden">
                <h2>Draft Results</h2>
                <div class="results-container">
                    <div id="bet-results"></div>
                    
                    <div id="set-selection" class="set-selection hidden">
                        <h3><span id="winner-name">Player 1</span>, choose which set to take:</h3>
                        <button id="choose-set-a" class="btn btn-primary set-btn">Take Set A</button>
                        <button id="choose-set-b" class="btn btn-primary set-btn">Take Set B</button>
                    </div>
                    
                    <div id="final-results" class="final-results hidden"></div>
                    
                    <div class="text-center">
                        <button id="next-round" class="btn btn-success hidden">Continue to Next Round</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Available piece sets with their values
        const PIECE_SETS = [
            { pieces: ["Pawn"], value: 1.5 },
            { pieces: ["Bishop"], value: 3 },
            { pieces: ["Knight"], value: 4 },
            { pieces: ["Rook"], value: 5 },
            { pieces: ["Queen"], value: 8.5 },
            { pieces: ["Pawn", "Pawn"], value: 3 },
            { pieces: ["Pawn", "Bishop"], value: 4.5 },
            { pieces: ["Pawn", "Knight"], value: 5.5 },
            { pieces: ["Bishop", "Knight"], value: 7 },
            { pieces: ["Rook", "Pawn"], value: 6.5 },
            { pieces: ["Bishop", "Rook"], value: 8 },
            { pieces: ["Knight", "Rook"], value: 9 },
            { pieces: ["Pawn", "Rook"], value: 6.5 },
            { pieces: ["Knight", "Knight"], value: 8 },
            { pieces: ["Bishop", "Bishop"], value: 6 },
            { pieces: ["Queen", "Pawn"], value: 10 },
            { pieces: ["Queen", "Bishop"], value: 11.5 },
            { pieces: ["Queen", "Knight"], value: 12.5 }
        ];

        // Game state
        let gameState = {
            player1: {
                name: "Player 1",
                bet: 0,
                pieces: [],
                betConfirmed: false,
                balance: 100
            },
            player2: {
                name: "Player 2",
                bet: 0,
                pieces: [],
                betConfirmed: false,
                balance: 100
            },
            currentRound: 1,
            setA: [],
            setB: [],
            currentPlayer: "player1"
        };

        // DOM elements
        const setupScreen = document.getElementById('setup-screen');
        const draftScreen = document.getElementById('draft-screen');
        const startDraftBtn = document.getElementById('start-draft');
        const revealBetsBtn = document.getElementById('reveal-bets');
        const nextRoundBtn = document.getElementById('next-round');
        const chooseSetABtn = document.getElementById('choose-set-a');
        const chooseSetBBtn = document.getElementById('choose-set-b');
        const player2BetSection = document.getElementById('player2-bet-section');
        const player1Confirmation = document.getElementById('player1-confirmation');
        const player2Confirmation = document.getElementById('player2-confirmation');
        const confirmPlayer1BetBtn = document.getElementById('confirm-player1-bet');
        const confirmPlayer2BetBtn = document.getElementById('confirm-player2-bet');
        const currentPlayerDisplay = document.getElementById('current-player');
        const player1BetDisplay = document.getElementById('player1-bet-display');
        const player2BetDisplay = document.getElementById('player2-bet-display');
        const roundDisplay = document.getElementById('current-round');
        const player1BalanceDisplay = document.getElementById('player1-balance');
        const player2BalanceDisplay = document.getElementById('player2-balance');
        const player1BetError = document.getElementById('player1-bet-error');
        const player2BetError = document.getElementById('player2-bet-error');

        // Initialize the application
        function init() {
            startDraftBtn.addEventListener('click', startDraft);
            revealBetsBtn.addEventListener('click', revealBets);
            chooseSetABtn.addEventListener('click', () => selectSet('A'));
            chooseSetBBtn.addEventListener('click', () => selectSet('B'));
            nextRoundBtn.addEventListener('click', nextRound);
            confirmPlayer1BetBtn.addEventListener('click', () => confirmBet('player1'));
            confirmPlayer2BetBtn.addEventListener('click', () => confirmBet('player2'));
            document.getElementById('player1-bet-amount').addEventListener('input', (e) => validateBet('player1', e.target.value));
            document.getElementById('player2-bet-amount').addEventListener('input', (e) => validateBet('player2', e.target.value));
            
        }
        
        function validateBet(player, amount) {
            const betAmount = parseInt(amount) || 0;
            const errorElement = player === 'player1' ? player1BetError : player2BetError;
            const confirmButton = player === 'player1' ? confirmPlayer1BetBtn : confirmPlayer2BetBtn;
            
            if (betAmount > gameState[player].balance) {
                errorElement.style.display = 'block';
                confirmButton.disabled = true;
                return false;
            } else {
                errorElement.style.display = 'none';
                confirmButton.disabled = false;
                return true;
            }
        }

        // Start the draft process
        function startDraft() {
            // Get player names and round number
            gameState.player1.name = document.getElementById('player1-name').value || "Player 1";
            gameState.player2.name = document.getElementById('player2-name').value || "Player 2";
            gameState.currentRound = parseInt(document.getElementById('draft-round').value) || 1;


            // Update balance displays
            player1BalanceDisplay.textContent = gameState.player1.balance;
            player2BalanceDisplay.textContent = gameState.player2.balance;

            // Reset bet states
            gameState.player1.betConfirmed = false;
            gameState.player2.betConfirmed = false;
            
            // Update display names
            document.getElementById('player1-name-display').textContent = gameState.player1.name;
            document.getElementById('player2-name-display').textContent = gameState.player2.name;
            roundDisplay.textContent = gameState.currentRound;
            
            // Generate random sets that meet the criteria
            generateValidSets();
            
            // Show the draft screen
            setupScreen.classList.remove('active');
            draftScreen.classList.add('active');
            
            // Reset UI for betting
            resetBettingUI();
            
            // Set current player to player1
            gameState.currentPlayer = "player1";
            updatePlayerIndicator();
        }

        // Generate sets that meet the value difference requirement
        function generateValidSets() {
            let setA, setB;
            let isValid = false;
            
            // Keep trying until we find valid sets
            while (!isValid) {
                // Shuffle all possible sets
                const shuffledSets = [...PIECE_SETS].sort(() => 0.5 - Math.random());
                
                // Pick two different sets
                setA = shuffledSets[0];
                setB = shuffledSets[1];
                
                // Ensure they're different and meet the value difference requirement
                if (JSON.stringify(setA.pieces) !== JSON.stringify(setB.pieces)) {
                    const valueDiff = Math.abs(setA.value - setB.value);
                    if (valueDiff <= 5) {
                        isValid = true;
                    }
                }
            }
            
            // Store the sets in game state
            gameState.setA = setA.pieces;
            gameState.setB = setB.pieces;
            gameState.setAValue = setA.value;
            gameState.setBValue = setB.value;
            
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

        // Confirm a player's bet
        function confirmBet(player) {
            const betInput = document.getElementById(`${player}-bet-amount`);
            const betAmount = parseInt(betInput.value) || 0;
            
            if (betAmount < 0) {
                alert("Bet amount cannot be negative");
                return;
            }

            if (betAmount > gameState[player].balance) {
                alert("You don't have enough chips for this bet!");
                return;
            }
            
            // Store the bet
            gameState[player].bet = betAmount;
            gameState[player].betConfirmed = true;
            
            // Show confirmation
            const confirmation = document.getElementById(`${player}-confirmation`);
            confirmation.style.display = 'block';
            
            // Hide the actual bet value and show obscured version
            betInput.classList.add('hidden');
            const betDisplay = document.getElementById(`${player}-bet-display`);
            betDisplay.textContent = betAmount;
            betDisplay.classList.remove('hidden');
            
            // Disable button for this player
            document.getElementById(`confirm-${player}-bet`).disabled = true;
            
            // If player1 just confirmed, show player2's bet section
            if (player === "player1") {
                player2BetSection.classList.remove('hidden');
                gameState.currentPlayer = "player2";
                updatePlayerIndicator();
            }
            
            // If both players have confirmed, enable reveal button
            if (gameState.player1.betConfirmed && gameState.player2.betConfirmed) {
                revealBetsBtn.disabled = false;
            }
        }

        // Update player indicator display
        function updatePlayerIndicator() {
            const player = gameState.currentPlayer === "player1" ? 
                gameState.player1.name : gameState.player2.name;
            
            currentPlayerDisplay.textContent = player;
            currentPlayerDisplay.className = 'player-indicator ' + 
                (gameState.currentPlayer === "player1" ? 'player1-indicator' : 'player2-indicator');
        }

        // Reveal the bets and determine winner
        function revealBets() {
            // Hide betting phase
            document.getElementById('betting-phase').classList.add('hidden');
            
            // Show results phase
            document.getElementById('results-phase').classList.remove('hidden');
            
            // Unhide the actual bet values
            document.getElementById('player1-bet-amount').classList.remove('hidden');
            document.getElementById('player2-bet-amount').classList.remove('hidden');
            player1BetDisplay.classList.add('hidden');
            player2BetDisplay.classList.add('hidden');

            gameState.player1.balance -= gameState.player1.bet;
            gameState.player2.balance -= gameState.player2.bet;
            
            // Update balance displays
            player1BalanceDisplay.textContent = gameState.player1.balance;
            player2BalanceDisplay.textContent = gameState.player2.balance;
            
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
                <div class="player-result player1-result">
                    <div><strong>${gameState.player1.name}</strong> bet:</div>
                    <div class="bet-amount">${gameState.player1.bet}</div>
                </div>
                <div class="player-result player2-result">
                    <div><strong>${gameState.player2.name}</strong> bet:</div>
                    <div class="bet-amount">${gameState.player2.bet}</div>
                </div>
                <p style="text-align: center; margin: 20px 0; font-size: 1.3rem; color: #FFD700">
                    <strong>${winner.name}</strong> wins the bidding!
                </p>
                <p style="text-align: center; color: #aaa">
                    Set A value: ${gameState.setAValue.toFixed(1)}, Set B value: ${gameState.setBValue.toFixed(1)}
                </p>
            `;
            
            // Show set selection
            document.getElementById('set-selection').classList.remove('hidden');
            document.getElementById('winner-name').textContent = winner.name;
            
            // Store winner in game state
            gameState.bettingWinner = winner;
            gameState.bettingLoser = loser;
        }

        // Handle set selection
        function selectSet(selectedSet) {
            const winner = gameState.bettingWinner;
            const loser = gameState.bettingLoser;
            
            // Assign sets to players
            const winnerSet = selectedSet === 'A' ? gameState.setA : gameState.setB;
            const loserSet = selectedSet === 'A' ? gameState.setB : gameState.setA;
            const winnerSetValue = selectedSet === 'A' ? gameState.setAValue : gameState.setBValue;
            const loserSetValue = selectedSet === 'A' ? gameState.setBValue : gameState.setAValue;
            
            winner.pieces.push(...winnerSet);
            loser.pieces.push(...loserSet);
            
            // Display final results
            const finalResults = document.getElementById('final-results');
            finalResults.innerHTML = `
                <h3>Draft Results</h3>
                <div class="player-result">
                    <div><strong>${winner.name}</strong> receives (value: ${winnerSetValue.toFixed(1)}):</div>
                    <div>${winnerSet.map(p => `<span class="piece-badge">${p}</span>`).join('')}</div>
                </div>
                <div class="player-result">
                    <div><strong>${loser.name}</strong> receives (value: ${loserSetValue.toFixed(1)}):</div>
                    <div>${loserSet.map(p => `<span class="piece-badge">${p}</span>`).join('')}</div>
                </div>
                <p style="text-align: center; margin-top: 20px; color: #FF5252">
                    All bids (${gameState.player1.bet + gameState.player2.bet}) are lost!
                </p>
            `;
            finalResults.classList.remove('hidden');
            
            // Hide selection buttons
            document.getElementById('set-selection').classList.add('hidden');
            
            // Show next round button
            nextRoundBtn.classList.remove('hidden');
        }

        // Reset the betting UI for a new draft
        function resetBettingUI() {
            // Reset bet inputs and states
            document.getElementById('player1-bet-amount').value = "0";
            document.getElementById('player2-bet-amount').value = "0";
            gameState.player1.bet = 0;
            gameState.player2.bet = 0;
            gameState.player1.betConfirmed = false;
            gameState.player2.betConfirmed = false;
            
            // Show inputs and hide displays
            document.getElementById('player1-bet-amount').classList.remove('hidden');
            document.getElementById('player2-bet-amount').classList.remove('hidden');
            player1BetDisplay.classList.add('hidden');
            player2BetDisplay.classList.add('hidden');
            
            // Reset confirmation displays
            player1Confirmation.style.display = 'none';
            player2Confirmation.style.display = 'none';
            
            // Reset player sections
            player2BetSection.classList.add('hidden');
            document.getElementById('betting-phase').classList.remove('hidden');

            player1BetError.style.display = 'none';
            player2BetError.style.display = 'none';
            
            // Update balance displays
            player1BalanceDisplay.textContent = gameState.player1.balance;
            player2BalanceDisplay.textContent = gameState.player2.balance;
            
            // Reset buttons
            revealBetsBtn.disabled = true;
            document.getElementById('player1-bet-amount').disabled = false;
            confirmPlayer1BetBtn.disabled = false;
            document.getElementById('player2-bet-amount').disabled = false;
            confirmPlayer2BetBtn.disabled = false;
            
            // Reset results display
            document.getElementById('results-phase').classList.add('hidden');
            document.getElementById('set-selection').classList.add('hidden');
            document.getElementById('final-results').classList.add('hidden');
            nextRoundBtn.classList.add('hidden');
            
            // Set current player to player1
            gameState.currentPlayer = "player1";
            updatePlayerIndicator();
        }

        // Prepare for next round
        function nextRound() {
            // Update round counter
            gameState.currentRound++;
            roundDisplay.textContent = gameState.currentRound;
            
            // Generate new valid sets
            generateValidSets();
            
            // Reset the betting UI
            resetBettingUI();
            
            // Show the draft screen (in case it was hidden)
            setupScreen.classList.remove('active');
            draftScreen.classList.add('active');
        }

        // Prepare for next round
        function nextRound() {
            // Update round counter
            gameState.currentRound++;
            document.getElementById('draft-round').value = gameState.currentRound;
            startDraft();
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
