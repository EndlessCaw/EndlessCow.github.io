<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chess Draft Timer</title>
  <style>
    :root {
      --bg-dark: #2e2e2e;
      --bg-darker: #1f1f1f;
      --bg-light: #3a3a3a;
      --text: #f0f0f0;
      --accent: #c0a060;
      --critical: #ff6666;
      --cost: #4da6ff;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: var(--bg-darker);
      color: var(--text);
      padding: 20px;
      margin: 0;
    }

    h1, h2, h3 { color: var(--accent); }

    input, button {
      font-size: 16px;
      padding: 8px 10px;
      margin: 5px 0;
      border-radius: 5px;
      border: 1px solid #444;
    }

    input {
      background: var(--bg-dark);
      color: var(--text);
    }

    button {
      background: var(--accent);
      color: black;
      font-weight: bold;
      cursor: pointer;
    }

    .screen { display: none; }
    .active { display: block; }

    .player {
      background: var(--bg-light);
      padding: 12px;
      margin: 8px 0;
      border-radius: 5px;
    }

    .timer { font-size: 20px; }
    .critical { color: var(--critical); }
    .cost { 
      color: var(--cost);
      font-weight: bold;
      margin-left: 8px;
    }

    .revealed {
      font-weight: bold;
      color: var(--accent);
    }

    .draft-timers {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }

    .draft-timers .player {
      flex: 1;
    }

    .active-player {
      border: 2px solid var(--accent);
      box-shadow: 0 0 6px var(--accent);
    }

    #sets > div {
      padding: 10px;
      margin: 10px 0;
      background: var(--bg-light);
      border-radius: 5px;
    }
    
    .set-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .cost-difference {
      padding: 5px 10px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <div id="setup" class="screen active">
    <h1>Game Setup</h1>
    <label>Player 1 Name: <input id="p1Name" value="Player 1" /></label><br />
    <label>Player 2 Name: <input id="p2Name" value="Player 2" /></label><br />
    <label>Main Time (min): <input id="mainTime" type="number" value="10" /></label><br />
    <label>Bonus Time (sec): <input id="bonusTime" type="number" value="30" /></label><br />
    <label>Draft Every N Turns: <input id="draftEvery" type="number" value="5" /></label><br />
    <button onclick="startGame()">Start Game</button>
  </div>

  <div id="game" class="screen">
    <h2>Game Turn <span id="turnCounter">1</span></h2>
    <div class="player" id="player1">
      <h3 id="player1Name"></h3>
      Bonus: <span id="p1Bonus" class="timer"></span> |
      Main: <span id="p1Main" class="timer"></span>
    </div>
    <div class="player" id="player2">
      <h3 id="player2Name"></h3>
      Bonus: <span id="p2Bonus" class="timer"></span> |
      Main: <span id="p2Main" class="timer"></span>
    </div>
    <button onclick="makeMove()">Make Move</button>
    <p>Turns until draft: <span id="draftCountdown"></span></p>
  </div>
  <div id="draft" class="screen">
    <h2>Draft Phase</h2>
    <div id="sets"></div>
    <div class="draft-timers">
      <div class="player" id="draftPlayer1">
        <h3 id="draftP1Name"></h3>
        Main: <span id="draftP1Main" class="timer"></span>
      </div>
      <div class="player" id="draftPlayer2">
        <h3 id="draftP2Name"></h3>
        Main: <span id="draftP2Main" class="timer"></span>
      </div>
    </div>
    <div id="betSection">
      <p id="betPrompt"></p>
      <input id="betInput" type="number" value="30"> 
      <button onclick="submitBet()">Submit Bet</button>
    </div>
    <div id="revealSection" style="display:none">
      <p>Bets Revealed:</p>
      <p id="bet1Display"></p>
      <p id="bet2Display"></p>
      <button onclick="selectSet(0)">Choose Set 1</button>
      <button onclick="selectSet(1)">Choose Set 2</button>
    </div>
  </div>
  
  <script>
    // Piece values for cost calculation
    const PIECE_VALUES = {
      "♟️": 1, // Pawn
      "♞": 3, // Knight
      "♝": 3, // Bishop
      "♜": 5, // Rook
      "♛": 9  // Queen
    };
    
    // Draft sets with cost calculation
    const DRAFT_SETS = [
      {name: "Pawn", pieces: ["♟️"], cost: 1},
      {name: "Pawn", pieces: ["♟️"], cost: 1},
      {name: "Bishop", pieces: ["♝"], cost: 3},
      {name: "Knight", pieces: ["♞"], cost: 3},
      {name: "Bishop", pieces: ["♝"], cost: 3},
      {name: "Knight", pieces: ["♞"], cost: 3},
      {name: "Rook", pieces: ["♜"], cost: 5},
      {name: "Queen", pieces: ["♛"], cost: 9},
      {name: "Rook", pieces: ["♜"], cost: 5},
      {name: "Queen", pieces: ["♛"], cost: 9},
      {name: "Two Pawns", pieces: ["♟️", "♟️"], cost: 2},
      {name: "Pawn + Bishop", pieces: ["♟️", "♝"], cost: 4},
      {name: "Pawn + Knight", pieces: ["♟️", "♞"], cost: 4},
      {name: "Bishop + Knight", pieces: ["♝", "♞"], cost: 6},
      {name: "Rook + Pawn", pieces: ["♜", "♟️"], cost: 6},
      {name: "Bishop + Rook", pieces: ["♝", "♜"], cost: 8},
      {name: "Knight + Rook", pieces: ["♞", "♜"], cost: 8},
      {name: "Pawn + Rook", pieces: ["♟️", "♜"], cost: 6},
      {name: "Two Knights", pieces: ["♞", "♞"], cost: 6},
      {name: "Two Bishops", pieces: ["♝", "♝"], cost: 6},
      {name: "Queen + Pawn", pieces: ["♛", "♟️"], cost: 10},
      {name: "Queen + Bishop", pieces: ["♛", "♝"], cost: 12},
      {name: "Queen + Knight", pieces: ["♛", "♞"], cost: 12}
    ];
  
    let state = {
      names: ["", ""],
      timers: [0, 0],
      bonus: [0, 0],
      bonusBase: 30,
      mainBase: 600,
      turn: 1,
      current: 0,
      draftEvery: 5,
      draftCountdown: 5,
      interval: null,
      bets: [null, null],
      sets: [],
      lastMover: 0,
      maxCostDiff: 5 // Maximum allowed cost difference
    };
  
    function switchScreen(id) {
      document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
      document.getElementById(id).classList.add("active");
    }
  
    function startGame() {
      state.names[0] = document.getElementById("p1Name").value;
      state.names[1] = document.getElementById("p2Name").value;
      state.mainBase = parseInt(document.getElementById("mainTime").value) * 60;
      state.bonusBase = parseInt(document.getElementById("bonusTime").value);
      state.draftEvery = parseInt(document.getElementById("draftEvery").value);
      state.timers = [state.mainBase, state.mainBase];
      state.bonus = [state.bonusBase, state.bonusBase];
      state.turn = 1;
      state.current = 0;
      state.draftCountdown = state.draftEvery;
      updateUI();
      switchScreen("game");
      tick();
    }
  
    function tick() {
      clearInterval(state.interval);
      state.interval = setInterval(() => {
        const idx = state.current;
        if (state.bonus[idx] > 0) {
          state.bonus[idx]--;
        } else {
          state.timers[idx]--;
          if (state.timers[idx] <= 0) {
            clearInterval(state.interval);
            alert(`${state.names[1 - idx]} wins! (${state.names[idx]} timed out)`);
            location.reload();
          }
        }
        updateUI();
      }, 1000);
    }
  
    function makeMove() {
      clearInterval(state.interval);
      state.lastMover = state.current;
      state.current = 1 - state.current;
      state.turn++;
      state.bonus[state.current] = state.bonusBase;
      state.draftCountdown--;
      if (state.draftCountdown === 0) {
        startDraft();
      } else {
        updateUI();
        tick();
      }
    }
  
    function updateUI() {
      document.getElementById("turnCounter").textContent = state.turn;
      document.getElementById("player1Name").textContent = state.names[0];
      document.getElementById("player2Name").textContent = state.names[1];
      document.getElementById("p1Bonus").textContent = format(state.bonus[0]);
      document.getElementById("p2Bonus").textContent = format(state.bonus[1]);
      document.getElementById("p1Main").textContent = format(state.timers[0]);
      document.getElementById("p2Main").textContent = format(state.timers[1]);
      document.getElementById("draftCountdown").textContent = state.draftCountdown;
    }
  
    function format(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s.toString().padStart(2, '0')}`;
    }
  
    function startDraft() {
      switchScreen("draft");
      state.sets = selectBalancedSets();
      displaySets();
      state.bets = [null, null];
      askBet(0);
    }
  
    // Select sets with balanced costs
    function selectBalancedSets() {
      let set1, set2;
      let attempts = 0;
      const maxAttempts = 50;
      
      do {
        // Select first set randomly
        set1 = DRAFT_SETS[Math.floor(Math.random() * DRAFT_SETS.length)];
        
        // Find compatible second set
        const compatibleSets = DRAFT_SETS.filter(s => 
          s !== set1 && Math.abs(set1.cost - s.cost) <= state.maxCostDiff
        );
        
        if (compatibleSets.length > 0) {
          set2 = compatibleSets[Math.floor(Math.random() * compatibleSets.length)];
        } else {
          // If no compatible sets, pick one with closest cost
          const closest = DRAFT_SETS.filter(s => s !== set1)
            .sort((a, b) => Math.abs(set1.cost - a.cost) - Math.abs(set1.cost - b.cost));
          set2 = closest[0];
        }
        
        attempts++;
      } while (Math.abs(set1.cost - set2.cost) > state.maxCostDiff && attempts < maxAttempts);
      
      return [set1, set2];
    }
  
    function displaySets() {
      const setsContainer = document.getElementById("sets");
      const costDiff = Math.abs(state.sets[0].cost - state.sets[1].cost);
      
      setsContainer.innerHTML = `
        <div class="set-info">
          <div><strong>Set 1:</strong> ${state.sets[0].name} 
            <span class="cost">(${state.sets[0].pieces.join(' ')})</span></div>
          <span class="cost">Cost: ${state.sets[0].cost}</span>
        </div>
        <div class="set-info">
          <div><strong>Set 2:</strong> ${state.sets[1].name} 
            <span class="cost">(${state.sets[1].pieces.join(' ')})</span></div>
          <span class="cost">Cost: ${state.sets[1].cost}</span>
        </div>
        <div class="cost-difference">
          Cost difference: ${costDiff} ${costDiff > state.maxCostDiff ? '⚠️' : ''}
        </div>
      `;
    }
  
    function updateDraftTimers() {
      document.getElementById("draftP1Main").textContent = format(state.timers[0]);
      document.getElementById("draftP2Main").textContent = format(state.timers[1]);
      document.getElementById("draftP1Name").textContent = state.names[0];
      document.getElementById("draftP2Name").textContent = state.names[1];
      document.getElementById("draftPlayer1").classList.toggle("active-player", state.current === 0);
      document.getElementById("draftPlayer2").classList.toggle("active-player", state.current === 1);
    }
  
    function askBet(p) {
      state.current = p;
      state.bonus[p] = state.bonusBase;
      tick();
      updateDraftTimers();
      document.getElementById("betPrompt").textContent = `${state.names[p]}, place your secret bet:`;
      document.getElementById("betInput").value = "30";
      document.getElementById("betSection").style.display = "block";
      document.getElementById("revealSection").style.display = "none";
    }
  
    function submitBet() {
      const val = parseInt(document.getElementById("betInput").value);
      if (isNaN(val) || val < 0 || val > state.timers[state.current]) {
        alert("Invalid bet. You cannot bet more than you currently have.");
        return;
      }
      state.bets[state.current] = val;
      clearInterval(state.interval);
      if (state.current === 0) askBet(1);
      else showReveal();
    }
  
    function showReveal() {
      document.getElementById("betSection").style.display = "none";
      document.getElementById("revealSection").style.display = "block";
      document.getElementById("bet1Display").innerHTML = `${state.names[0]} bet: <span class="revealed">${state.bets[0]} sec</span>`;
      document.getElementById("bet2Display").innerHTML = `${state.names[1]} bet: <span class="revealed">${state.bets[1]} sec</span>`;
    }
  
    function selectSet(winnerIndex) {
      state.timers[0] -= state.bets[0];
      state.timers[1] -= state.bets[1];
      if (state.timers[0] < 0) state.timers[0] = 0;
      if (state.timers[1] < 0) state.timers[1] = 0;
      state.draftCountdown = state.draftEvery;
      state.current = 1 - state.lastMover;
      state.bonus[state.current] = state.bonusBase;
      updateUI();
      switchScreen("game");
      tick();
    }
  </script>
</body>
</html>

