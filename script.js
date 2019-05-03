var scores, roundsScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice;
        var diceDom = document.querySelector('.dice');

        dice = Math.floor(Math.random() * 6 + 1);
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        if (dice !== 1) {
            // add
            roundsScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundsScore;
        } else {
            //another player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add CURENT score to GLOBAL score
        scores[activePlayer] += roundsScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Chek if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !!';

            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundsScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundsScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
