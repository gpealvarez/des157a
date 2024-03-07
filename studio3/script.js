(function(){
    'use strict';
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const quitbtn = document.querySelector('#quitbtn');

    const gameData = {
        dice: ['images/onedolla.png', 'images/2dolla.png', 'images/3dolla.png', 'images/4dolla.png', 'images/5dolla.png', 'images/fakedolla.png'],
        players: ['piggy one', 'piggy two'],
        score: [0, 0],
        flip: 0,
        flipSum: 0,
        index: 0,
        gameEnd: 29 //for how long game will be

    };

    startGame.addEventListener('click', function(){
        gameControl.innerHTML = '<h1> Piggy Game <h1>';
        gameControl.innerHTML = '<p> The game has started <p>';
        gameControl.innerHTML = ' <img src="images/piggy.png" alt="piggy left" width="500px">';

        gameData.index = Math.round(Math.random());

        setUpTurn();

    });

    function setUpTurn(){
    // Set up the HTML structure
    gameControl.innerHTML = `
        <div class="coin-container">
            <img src="images/piggy.png" alt="piggy left" width="500px" class="piggy-image">
            <img src="images/dollasigncoin.png" alt="simplecoin" width="150px" class="coin-image">
        </div>
    `;

    game.innerHTML = `<p> ${gameData.players[gameData.index]}'s turn </p>`;
    
    // Set up flip button
    actionArea.innerHTML = '<button id="flip"> flip the coin </button>';
    document.getElementById('flip').addEventListener('click', function(){
        throwDice();
    });

    // Check if the quit button already exists before adding it
    if (!document.getElementById('quit')) {
        quitbtn.innerHTML += '<button id="quit" > QUIT </button>';
        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
    }
}

function throwDice(){
    actionArea.innerHTML = '';
    gameData.flip = Math.floor(Math.random() * 6) + 1;
    game.innerHTML = `<p> ${gameData.players[gameData.index]}'s turn </p>`;
    game.innerHTML += `<img src= '${gameData.dice[gameData.flip-1]}' width="150px">`;
    gameData.flipSum = gameData.flip;

    if(gameData.flipSum === 6){
        //console.log ('fake coin');
        showCurrentScore();

        game.innerHTML = '<p> Fake Coin! </p>';
        gameData.score[gameData.index] = 0;
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        setTimeout(setUpTurn,2000);

    } else if (gameData.flip === 1){
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        game.innerHTML =`<p> your flip resulted on a one dollar coin, switching to ${gameData.players[gameData.index]}</p>`;
        setTimeout(setUpTurn,2000);

    } else {
        //console.log ("game proceeds...");
        gameData.score[gameData.index]= gameData.score[gameData.index] + gameData.flipSum;
        // Create a container for the buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Create and append the "Flip Again" button
        const flipAgainButton = document.createElement('button');
        flipAgainButton.textContent = 'Flip Again';
        flipAgainButton.id = 'flipagain';
        flipAgainButton.addEventListener('click', function(){
            setUpTurn();
        });
        buttonsContainer.appendChild(flipAgainButton);

        // Create and append the "Pass" button
        const passButton = document.createElement('button');
        passButton.textContent = 'Pass';
        passButton.id = 'pass';
        passButton.addEventListener('click', function(){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setUpTurn();
        });
        buttonsContainer.appendChild(passButton);

        // Append the buttons container to the action area
        actionArea.appendChild(buttonsContainer);
    }
    checkWinningCondition();
}

function checkWinningCondition(){
    if (gameData.score [gameData.index] > gameData.gameEnd) {
        score.innerHTML = `<h2>${gameData.players [gameData.index]}
        wins with ${gameData.score [gameData.index]} coins!</h2>`;

        actionArea.innerHTML = '';
        document. getElementById('quit').innerHTML = "Start New Game";
    }else{
        showCurrentScore();
    }
}

function showCurrentScore() {
    score.innerHTML = `
    <div class="eachscore"> 
        <p ><strong>${gameData.players[0]} ${gameData.score[0]}</strong></p>
        <p><strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>
    </div>`;

}// add id for each p to edit individually and center maybe

})();

