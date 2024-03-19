(function () {
    'use strict'; // Enforce strict mode for better error handling

    console.log('reading JS'); // Log to console for debugging

    // Selecting necessary elements from the DOM
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const quitbtn = document.querySelector('#quitbtn');
    const instbtn = document.querySelector('#instbtn');
    const instdiv = document.querySelector('#instructions');
    const player1Name = document.getElementById('player1').value || 'Player One';
    const player2Name = document.getElementById('player2').value || 'Player Two';

    // Object containing game data
    const gameData = {
        dice: ['images/onedolla.png', 'images/2dolla.png', 'images/3dolla.png', 'images/4dolla.png', 'images/5dolla.png', 'images/fakedolla.png'],
        players: ['Player One', 'Player Two'],
        score: [0, 0],
        flip: 0,
        flipSum: 0,
        index: 0,
        gameEnd: 29 // Game duration
    };

    // Audio elements setup
    const moneyinc = new Audio('sounds/moneyinc.mp3');
    const moneydec = new Audio('sounds/moneydec.mp3');
    const btnsound = new Audio('sounds/buttonsound.mp3');
    const flipsound = new Audio('sounds/coinflinp.mp3');
    const quitbsound = new Audio('sounds/buttonsound.mp3');
    const winsound = new Audio('sounds/winner.mp3');

    // Function to toggle visibility of instructions
    function showinst() {
        if (instdiv.classList.contains('hidden')) {
            instdiv.classList.remove('hidden');
        } else {
            instdiv.classList.add('hidden');
        }
        btnsound.play(); // Play button sound
    }

    // Function to close instructions
    function closeinst() {
        instdiv.classList.add('hidden');
        btnsound.play(); // Play button sound
    }

    // Event listeners for instruction buttons
    instbtn.addEventListener('click', showinst);
    document.querySelector('.closebtn').addEventListener('click', closeinst);

    // Event listener for starting the game
    startGame.addEventListener('click', function () {
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');
        const player1Name = player1Input.value.trim() || 'Player One';
        const player2Name = player2Input.value.trim() || 'Player Two';
        gameData.players = [player1Name, player2Name];
        gameControl.innerHTML = `<h1>Piggy Game</h1><img src="images/piggy.png" alt="piggy left" width="500px">`;
        gameData.index = Math.round(Math.random());
        setUpTurn();
        showCurrentScore();
    });

    // Event listener for when DOM content is loaded
    document.addEventListener('DOMContentLoaded', function () {
        const introverlay = document.getElementById('introverlay');
        setTimeout(function () {
            introverlay.classList.add('hide');
        }, 1000);
    });

    // Event listener for mouse down on start button
    startGame.addEventListener('mousedown', function () {
        btnsound.play(); // Play button sound
    });

    // Function to set up a new turn
    function setUpTurn() {
        const piggyImageClass = gameData.index === 0 ? 'piggy-image' : 'piggy-image2';
        const piggyImageSrc = gameData.index === 0 ? 'images/piggy.png' : 'images/piggyflipped.png';

        // Display piggy image and coin image
        gameControl.innerHTML = `<div class="coin-container">
            <img src="${piggyImageSrc}" alt="piggy left" width="520px" class="${piggyImageClass}">
            <img src="images/dollasigncoin.png" alt="simplecoin" width="150px" class="coin-image">
        </div>`;

        // Display current player's turn
        game.innerHTML = `<p>${gameData.players[gameData.index]}'s Turn</p>`;
        actionArea.innerHTML = '<button id="flip">Flip Coin</button>';

        // Event listener for flipping the coin
        document.getElementById('flip').addEventListener('click', throwDice);

        const flipbtn = document.querySelector('#flip');

        // Event listener for mouse down on flip button
        flipbtn.addEventListener('mousedown', function () {
            flipsound.play(); // Play flip sound
        });

        // Adding the "Quit" button if it doesn't already exist
        if (!document.getElementById('quit')) {
            quitbtn.innerHTML += '<button id="quit">QUIT</button>';
            // Event listener for quitting the game
            document.getElementById('quit').addEventListener('click', function () {
                location.reload();
            });
        }

        const quitb = document.querySelector('#quit');

        // Event listener for mouse down on quit button
        quitb.addEventListener('mousedown', function () {
            quitbsound.play(); // Play quit sound
        });

    }

    // Function to simulate the dice roll
    function throwDice() {
        actionArea.innerHTML = '';
        gameData.flip = Math.floor(Math.random() * 6) + 1;
        game.innerHTML += `<img src='${gameData.dice[gameData.flip - 1]}' width="150px">`;
        gameData.flipSum = gameData.flip;

        if (gameData.flipSum === 6) {
            // If a fake coin is flipped
            showCurrentScore();
            game.innerHTML = "<p>Oh no a Fake Coin :(</p>";
            game.innerHTML += `<img src='${gameData.dice[gameData.flip - 1]}' width="150px">`;
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
            moneydec.play(); // Play money decrease sound
        } else if (gameData.flip === 1) {
            // If a $1 coin is flipped
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML = `<p>A dollarcoin :( switching players</p>`;
            game.innerHTML += `<img src='${gameData.dice[gameData.flip - 1]}' width="150px">`;
            setTimeout(setUpTurn, 2000);
            moneydec.play(); // Play money decrease sound

        } else {
            // If a regular coin is flipped
            gameData.score[gameData.index] += gameData.flipSum;
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');

            const flipAgainButton = createButton('Flip Again', 'flipagain', function () {
                setUpTurn();
                btnsound.play(); // Play button sound
            });
            const passButton = createButton('Pass', 'pass', function () {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
                moneyinc.play(); // Play money increase sound
            });

            buttonsContainer.appendChild(flipAgainButton);
            buttonsContainer.appendChild(passButton);
            actionArea.appendChild(buttonsContainer);
        }
        checkWinningCondition();
    }

    // Function to display the winner and show the outro overlay
    function showWinner() {
        const winnerText = document.getElementById('winnerText');
        const outroOverlay = document.getElementById('outroverlay');

        const winner = gameData.score[0] > gameData.score[1] ? gameData.players[0] : gameData.players[1];
        winnerText.textContent = `${winner} wins with ${Math.max(...gameData.score)} coins!`;

        outroOverlay.classList.remove('hidden');
    }

    // Event listener for starting a new game
    document.getElementById('startNewGame').addEventListener('click', function () {
        location.reload();
    });

    // Function to check winning condition
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            showWinner();
            score.innerHTML += `<h2 class="winning">${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} coins!</h2>`;
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start New Game";
            winsound.play(); // Play win sound

        } else {
            showCurrentScore();
        }
    }

    // Function to display the current score
    function showCurrentScore() {
        score.innerHTML = `
        <div class="eachscore"> 
            <div class="leftscore">
                <img src="images/piggyface.png" alt="Piggy Player" width="200px">
                <p id="lefts">${gameData.players[0]}</p>
                <p id="lefts">${gameData.score[0]}</p>
            </div>
            <div class="rightscore">
                <img src="images/piggyface.png" alt="Piggy Player" width="200px">
                <p id="rights">${gameData.players[1]}</p>
                <p id="rights">${gameData.score[1]}</p>
            </div> 
        </div>`;
    }

    // Function to create a button with specified text, ID, and event listener
    function createButton(text, id, eventListener) {
        const button = document.createElement('button');
        button.textContent = text;
        button.id = id;
        button.addEventListener('click', eventListener);
        return button;
    }

})();
