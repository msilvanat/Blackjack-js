// Self-invoked anonymous function
// My module will be equal to the product of this self-invoked anonymous function.

const myModule = (() => {
    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    // HTML references
    const btnOrder = document.querySelector('#btnOrder'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew');

    const divPlayersCards = document.querySelectorAll('.divCards'),
        htmlPoints = document.querySelectorAll('small');

    // This function initialize the game
    const initializeGame = (numPlayers = 2) => {
        deck = createDeck();

        playersPoints = [];
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }

        htmlPoints.forEach( elem => elem.innerText = 0 );
        divPlayersCards.forEach( elem => elem.innerHTML = '' );

        btnOrder.disabled = false;
        btnStop.disabled = false;
    }

    //Create new deck
    const createDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type);
            }
        }

        return _.shuffle(deck);
    }


    // This function allows me to take a card, draw a card randomly from the deck,
    // it assigns the card and removes it from the deck. 
    // pop method removes the last element of the array and returns it 
    const orderCard = () => {

        //if there are no cards, it is not executed 
        if (deck.length === 0) {
            throw 'No cards in the deck';
        }
        return deck.pop();
    }

    //Card value
    //substring to remove the last letter of the numbers
    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10   //si es un as vale 11, caso contrario vale 10
            : value * 1;  //si es un as vale 11, caso contrario vale 10
    }

    //Turn: 0 first player and the last one will be the computer
    const accumulatePoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('cards');
        divPlayersCards[turn].append(imgCard);
    }

    const determinateWinner = () => {
        const [minimumPoints, computerPoints] = playersPoints;

        setTimeout(() => {
            if (computerPoints === minimumPoints) {
                alert('Nobody wins :(');
            } else if (minimumPoints > 21) {
                alert('Computer wins')
            } else if (computerPoints > 21) {
                alert('Player wins');
            } else {
                alert('Computer wins');
            }
        }, 10);
    }

    // Computer turn: is executed when the player loses or reaches 21 or touches the stop button
    const computerTurn = (minimumPoints) => {
        let computerPoints = 0;
        do {
            const card = orderCard();
            computerPoints = accumulatePoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);
        } while ((computerPoints < minimumPoints) && (minimumPoints <= 21));
        determinateWinner();
    }

    //Events
    btnOrder.addEventListener('click', () => {
        const card = orderCard();
        const playerPoints = accumulatePoints(card, 0);
        createCard(card, 0);

        if (playerPoints > 21) {
            console.warn('Sorry, you lost');
            btnOrder.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);

        } else if (playerPoints === 21) {
            console.warn('21, cool you win!');
            btnOrder.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        }
    });

    btnStop.addEventListener('click', () => {
        btnOrder.disabled = true;
        btnStop.disabled = true;
        computerTurn(playersPoints[0]);
    });

    //It is the only thing that is returned, it is only accessed through the module
    return {
        newGame: initializeGame
    };
})();








