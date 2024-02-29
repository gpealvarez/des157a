(function(){
    'use strict';
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    const gameData = {
        dice: ['images/onedolla.png', 'images/2dolla.png', 'images/3dolla.png', 'images/4dolla.png', 'images/5dolla.png', 'images/fakedolla.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        flip: 0,
        flipSum: 0,
        index: 0,
        gameEnd: 29 //for how long game will be

    };

    startGame.addEventListener('click', function(){
        gameControl.innerHTML = '<h2> The game has started </h2>';
        gameControl.innerHTML += '<button id="quit" > Wanna quit? </button>';

        gameData.index = Math.round(Math.random());
           // console.log(gameData.index);


        document.getElementById ('quit').addEventListener('click', function(){
            location.reload();
        });

        //console.log("set up the turn");
        setUpTurn();

    });

    function setUpTurn(){
        game.innerHTML = `<p> flip the coin for ${gameData.players[gameData.index]} </p>`;
    
        actionArea.innerHTML = '<button id="flip"> flip the coin </button>';
        document.querySelector('#flip').addEventListener('click', function(){
            //console.log('flip the dice');
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.flip = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p> flip the coin for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src= '${gameData.dice[gameData.flip-1]}'>`;
        gameData.flipSum = gameData.flip;

        if(gameData.flipSum === 6){
            //console.log ('fake coin');
            showCurrentScore();


            game.innerHTML += '<p> Fake Coin! </p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn,2000);

        } else if (gameData.flip === 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML +=`<p> your flip resulted on a one dollar coin, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn,2000);

        } else {
            //console.log ("game proceeds...");
            gameData.score[gameData.index]= gameData.score[gameData.index] + gameData.flipSum;
            actionArea.innerHTML = '<button id="flipagain"> Flip Again </button> <button id= "pass"> Pass</button>';
            document.getElementById('flipagain').addEventListener('click', function(){
                setUpTurn();
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
        }
        checkWinningCondition();
    }

    function checkWinningCondition(){
        if (gameData.score [gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players [gameData.index]}
            wins with ${gameData.score [gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document. getElementById('quit').innerHTML = "Start a New Game?";
        }else{
            showCurrentScore();
        }
    }
    
    function showCurrentScore(){
        score.innerHTML = `<p> The score is currently <strong>${gameData.players[0]}
        ${gameData.score[0]}</strong> and <strong> ${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
    }

})();

