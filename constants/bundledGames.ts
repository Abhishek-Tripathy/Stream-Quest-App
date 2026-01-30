export const SIMPLE_GAME_1 = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        body { margin: 0; padding: 0; background: #60a3bc; font-family: 'Arial', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; touch-action: none; }
        h1 { color: #fff; margin-bottom: 10px; font-size: 28px; text-shadow: 2px 2px 0 #3c6382; }
        .stats { display: flex; gap: 20px; margin-bottom: 20px; font-size: 20px; color: white; font-weight: bold; }
        
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 300px; height: 300px; }
        .hole { background: #3c6382; border-radius: 50%; position: relative; overflow: hidden; border: 4px solid #0a3d62; box-shadow: inset 0 10px 10px rgba(0,0,0,0.5); }
        
        .mole {
            width: 80%; height: 80%;
            background: #e55039;
            border-radius: 50%;
            position: absolute;
            top: 100%; left: 10%; /* Start hidden */
            transition: top 0.3s;
            cursor: pointer;
            box-shadow: inset 5px 5px 10px rgba(255,255,255,0.3);
        }
        .mole::after {
            content: "👀"; font-size: 30px; position: absolute; left: 20%; top: 10%;
        }
        
        .up { top: 10%; } /* Pop up */
        
        #start-btn, #restart-btn {
            padding: 15px 40px; background: #f6b93b; color: #fff;
            border: none; border-radius: 30px; font-size: 20px;
            box-shadow: 0 4px 0 #e58e26; cursor: pointer; text-shadow: 1px 1px 0 rgba(0,0,0,0.2);
            margin-top: 20px;
        }
        #start-btn:active, #restart-btn:active { transform: translateY(4px); box-shadow: none; }
        
        #game-over {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            display: none; flex-direction: column; align-items: center; justify-content: center;
            color: white; z-index: 20;
        }
    </style>
</head>
<body>
    <h1>Whack-a-Mole</h1>
    <div class="stats">
        <div>Score: <span id="score">0</span></div>
        <div>Time: <span id="time">30</span></div>
    </div>

    <div class="grid">
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
        <div class="hole"><div class="mole" onclick="whack(this)"></div></div>
    </div>

    <button id="start-btn" onclick="startGame()">START GAME</button>

    <div id="game-over">
        <h1 style="color: #f6b93b;">TIME UP!</h1>
        <p style="font-size: 24px;">Final Score: <span id="final-score">0</span></p>
        <button id="restart-btn" onclick="startGame()">PLAY AGAIN</button>
    </div>

    <script>
        const holes = document.querySelectorAll('.hole');
        const moles = document.querySelectorAll('.mole');
        const scoreBoard = document.getElementById('score');
        const timeBoard = document.getElementById('time');
        const startBtn = document.getElementById('start-btn');
        const gameOverScreen = document.getElementById('game-over');
        
        let lastHole;
        let timeUp = false;
        let score = 0;
        let timeLeft = 30;
        let timerId;

        function randomTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        function randomHole(holes) {
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            if (hole === lastHole) return randomHole(holes);
            lastHole = hole;
            return hole;
        }

        function peep() {
            const time = randomTime(500, 1000); // Speed
            const hole = randomHole(holes);
            const mole = hole.querySelector('.mole');
            
            mole.classList.add('up');
            
            setTimeout(() => {
                mole.classList.remove('up');
                if (!timeUp) peep();
            }, time);
        }

        function startGame() {
            scoreBoard.textContent = 0;
            timeBoard.textContent = 30;
            score = 0;
            timeLeft = 30;
            timeUp = false;
            
            startBtn.style.display = 'none';
            gameOverScreen.style.display = 'none';
            
            peep();
            
            timerId = setInterval(() => {
                timeLeft--;
                timeBoard.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    timeUp = true;
                    document.getElementById('final-score').textContent = score;
                    gameOverScreen.style.display = 'flex';
                }
            }, 1000);
        }

        function whack(mole) {
            if(!mole.classList.contains('up')) return;
            score++;
            mole.classList.remove('up'); // Hide immediately
            scoreBoard.textContent = score;
        }
    </script>
</body>
</html>
`;

export const SIMPLE_GAME_2 = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #222; font-family: sans-serif; color: #fff; text-align: center; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 350px; margin: 20px auto; }
        .card { 
            background: #444; height: 80px; border-radius: 8px; 
            display: flex; justify-content: center; align-items: center; 
            font-size: 30px; cursor: pointer; user-select: none;
        }
        .matched { background: #2ecc71; }
        .flipped { background: #3498db; }
        button { padding: 10px 20px; background: #e67e22; border: none; border-radius: 5px; color: white; font-size: 16px; margin-top: 20px; }
    </style>
</head>
<body>
    <h2>Memory Match</h2>
    <div class="grid" id="grid"></div>
    <div id="msg"></div>
    <button onclick="initGame()">Restart</button>

    <script>
        const symbols = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
        let cards = [...symbols, ...symbols];
        let flipped = [];
        let matched = [];

        function initGame() {
            const grid = document.getElementById('grid');
            grid.innerHTML = '';
            matched = [];
            flipped = [];
            document.getElementById('msg').innerText = '';
            
            // Shuffle
            cards.sort(() => Math.random() - 0.5);

            cards.forEach((symbol, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.index = index;
                card.dataset.symbol = symbol;
                card.onclick = () => flipCard(card);
                grid.appendChild(card);
            });
        }

        function flipCard(card) {
            if (flipped.length < 2 && !flipped.includes(card) && !matched.includes(card)) {
                card.classList.add('flipped');
                card.innerText = card.dataset.symbol;
                flipped.push(card);

                if (flipped.length === 2) {
                    setTimeout(checkMatch, 800);
                }
            }
        }

        function checkMatch() {
            const [c1, c2] = flipped;
            if (c1.dataset.symbol === c2.dataset.symbol) {
                c1.classList.add('matched');
                c2.classList.add('matched');
                matched.push(c1, c2);
                if (matched.length === cards.length) document.getElementById('msg').innerText = "YOU WIN!";
            } else {
                c1.classList.remove('flipped');
                c1.innerText = '';
                c2.classList.remove('flipped');
                c2.innerText = '';
            }
            flipped = [];
        }

        initGame();
    </script>
</body>
</html>
`;

export const SIMPLE_GAME_3 = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        body { margin: 0; overflow: hidden; background: #000; touch-action: none; font-family: monospace; color: white; }
        #player {
            width: 40px; height: 40px; background: #3498db;
            position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
            border-radius: 4px; box-shadow: 0 0 10px #3498db;
        }
        .asteroid {
            position: absolute; width: 30px; height: 30px; background: #e74c3c;
            border-radius: 50%; box-shadow: 0 0 5px #e74c3c;
        }
        #ui { position: absolute; top: 10px; left: 10px; z-index: 10; font-size: 20px; }
        #game-over {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8); display: none;
            flex-direction: column; justify-content: center; align-items: center;
        }
        button { padding: 15px 30px; font-size: 20px; background: #2ecc71; border: none; color: white; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div id="ui">Score: <span id="score">0</span></div>
    <div id="player"></div>
    <div id="container"></div>

    <div id="game-over">
        <h1>GAME OVER</h1>
        <p>Final Score: <span id="final-score">0</span></p>
        <button onclick="startGame()">TRY AGAIN</button>
    </div>

    <script>
        const player = document.getElementById('player');
        const container = document.getElementById('container');
        let playerX = window.innerWidth / 2;
        let score = 0;
        let gameActive = false;
        let asteroids = [];
        let animationId;
        let spawnRate = 60; // Frames between spawns
        let frame = 0;

        // Touch controls
        document.addEventListener('touchmove', (e) => {
            if(!gameActive) return;
            e.preventDefault();
            playerX = e.touches[0].clientX;
            updatePlayerPos();
        }, { passive: false });
        
        document.addEventListener('mousemove', (e) => {
             if(!gameActive) return;
             playerX = e.clientX;
             updatePlayerPos();
        });

        function updatePlayerPos() {
            // Clamp to screen
            playerX = Math.max(20, Math.min(window.innerWidth - 20, playerX));
            player.style.left = playerX + 'px';
        }

        function spawnAsteroid() {
            const el = document.createElement('div');
            el.className = 'asteroid';
            const x = Math.random() * (window.innerWidth - 30);
            el.style.left = x + 'px';
            el.style.top = '-30px';
            container.appendChild(el);
            asteroids.push({ el, x, y: -30, speed: Math.random() * 3 + 3 });
        }

        function loop() {
            if (!gameActive) return;

            frame++;
            if (frame % spawnRate === 0) {
                spawnAsteroid();
                if (spawnRate > 20) spawnRate--; // Get harder
            }

            // Update asteroids
            for (let i = asteroids.length - 1; i >= 0; i--) {
                const a = asteroids[i];
                a.y += a.speed;
                a.el.style.top = a.y + 'px';

                // Collision detection
                const pRect = player.getBoundingClientRect();
                const aRect = a.el.getBoundingClientRect();
                
                if (
                    aRect.left < pRect.right &&
                    aRect.right > pRect.left &&
                    aRect.top < pRect.bottom &&
                    aRect.bottom > pRect.top
                ) {
                    endGame();
                    return;
                }

                // Remove if off screen
                if (a.y > window.innerHeight) {
                    a.el.remove();
                    asteroids.splice(i, 1);
                    score++;
                    document.getElementById('score').innerText = score;
                }
            }

            animationId = requestAnimationFrame(loop);
        }

        function startGame() {
            asteroids.forEach(a => a.el.remove());
            asteroids = [];
            score = 0;
            frame = 0;
            spawnRate = 60;
            gameActive = true;
            document.getElementById('score').innerText = '0';
            document.getElementById('game-over').style.display = 'none';
            loop();
        }

        function endGame() {
            gameActive = false;
            cancelAnimationFrame(animationId);
            document.getElementById('final-score').innerText = score;
            document.getElementById('game-over').style.display = 'flex';
        }

        startGame();
    </script>
</body>
</html>
`;

