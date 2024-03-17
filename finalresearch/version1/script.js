(function () {
    'use strict';
    console.log('reading JS');

    // Selecting necessary elements from the DOM
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const quitbtn = document.querySelector('#quitbtn');

    // Game data object containing various game parameters
    const gameData = {
        dice: ['images/onedolla.png', 'images/2dolla.png', 'images/3dolla.png', 'images/4dolla.png', 'images/5dolla.png', 'images/fakedolla.png'],
        players: ['Piggy One', 'Piggy Two'],
        score: [0, 0],
        flip: 0,
        flipSum: 0,
        index: 0,
        gameEnd: 29 // Game duration
    };

    // Event listener for the "Start Game" button
    startGame.addEventListener('click', function () {
        // Setting up the initial game interface
        gameControl.innerHTML = `<h1>Piggy Game</h1><img src="images/piggy.png" alt="piggy left" width="500px">`;

        // Randomly selecting the starting player
        gameData.index = Math.round(Math.random());
        // Setting up the initial turn and displaying the current score
        setUpTurn();
        showCurrentScore();
    });

    // Function to set up a new turn
    function setUpTurn() {
        const piggyImageClass = gameData.index === 0 ? 'piggy-image' : 'piggy-image2';
        const piggyImageSrc = gameData.index === 0 ? 'images/piggy.png' : 'images/piggyflipped.png';

        gameControl.innerHTML = `<div class="coin-container">
            <img src="${piggyImageSrc}" alt="piggy left" width="520px" class="${piggyImageClass}">
            <img src="images/dollasigncoin.png" alt="simplecoin" width="150px" class="coin-image">
        </div>`;

        game.innerHTML = `<p>${gameData.players[gameData.index]}'s Turn</p>`;
        actionArea.innerHTML = '<button id="flip">Flip Coin</button>';

        document.getElementById('flip').addEventListener('click', throwDice);

        // Adding the "Quit" button if it doesn't already exist
        if (!document.getElementById('quit')) {
            quitbtn.innerHTML += '<button id="quit">QUIT</button>';
            document.getElementById('quit').addEventListener('click', function () {
                location.reload();
            });
        }
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
        } else if (gameData.flip === 1) {
            // If a $1 coin is flipped
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML = `<p>A dollarcoin :( switching players</p>`;
            game.innerHTML += `<img src='${gameData.dice[gameData.flip - 1]}' width="150px">`;
            setTimeout(setUpTurn, 2000);
        } else {
            // If a regular coin is flipped
            gameData.score[gameData.index] += gameData.flipSum;
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');

            const flipAgainButton = createButton('Flip Again', 'flipagain', setUpTurn);
            const passButton = createButton('Pass', 'pass', function () {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            buttonsContainer.appendChild(flipAgainButton);
            buttonsContainer.appendChild(passButton);
            actionArea.appendChild(buttonsContainer);
        }
        checkWinningCondition();
    }

    // Function to check winning condition
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            // If a player has won
            score.innerHTML += `<h2 class="winning">${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} coins!</h2>`;
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start New Game";
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
