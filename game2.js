/*
2C = Two of Clubs (Tréboles)
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades
*/

// El último jugador siempre va a ser la computadora
(() => {
   


})();



let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    computerPoints = 0;

// Referencias HTML
const btnOrder = document.querySelector('#btnOrder');
const btnStop = document.querySelector('#btnStop');
const btnNew = document.querySelector('#btnNew');

const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');

const htmlPoints = document.querySelectorAll('small');

/* Instruction create deck
Create all the cards, starting with numbers
Ciclo for: 
initializate with 2 because it is the first number I have, hacer el ciclo for siempre
y cuando la i sea menor a 10, porque 10 es el numero más añto de las cartas 
dentro de un for hago otro ciclo for of, el for of se ejecuta una vez por cada tipo 
que tengo en mi constante types (c, d, h, s)
Ahora necesito crear las letras : crear un arreglo con las otras cartas 
Utilicé la librería underscore para desordenar las cartas, es una librería muy popular 
que ofrece muchas funciones que js deberia tener por defecto pero que no tiene
shuffle: instruccion que recibe un  arreglo y lo regresa de manera aleatoria 
*Pedir carta de la baraja 
*/

//Esta función crea un nuevo deck 
const createDeck = () => {
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

    // console.log(deck);
    deck = _.shuffle(deck);
    
    return deck;
}

createDeck();


//Esta función me permite tomar una carta - extrae del deck una carta de manera aleatoria,
// se le asigna la carta y lo remueve del deck 
//el pop remueve el ultimo elemento del arreglo y lo regresa 
//
const orderCard = () => {

    // si no hay cartas no se ejecuta 
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop();
    return card;
}


// orderCard();

//Card value
//substring para remover la última letra de los números
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10   //si es un as vale 11, caso contrario vale 10
        : value * 1;  //si es un as vale 11, caso contrario vale 10
}


// Computer turn : se dispara cuando el jugador pierde o llega a 21 o
//toca el boton stop 
const computerTurn = ( minimumPoints ) => {

    do {

    const card = orderCard();

    computerPoints = computerPoints + cardValue(card);
    htmlPoints[1].innerText = computerPoints;

    // Insert/ create card 
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('cards');
    divComputerCards.append(imgCard);

    if( minimumPoints > 21 ) {
        break;
    }

   } while( (computerPoints < minimumPoints ) && ( minimumPoints <= 21 ));

   setTimeout(() => {
    if( computerPoints === minimumPoints ) {
        alert('Nobody wins :(');
    } else if ( minimumPoints > 21 ) {
        alert('Computer wins')
    } else if( computerPoints > 21 ) {
        alert('Player wins');
    } else {
        alert('Computer wins')
    }
   }, 10 );
   

}



//Events
btnOrder.addEventListener('click', () => {

    const card = orderCard();

    playerPoints = playerPoints + cardValue(card);
    htmlPoints[0].innerText = playerPoints;

    // Insert/ create card 
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('cards');
    divPlayerCards.append(imgCard);


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
    computerTurn( playerPoints );
});

btnNew.addEventListener('click', () => {

    console.clear();
    deck = [];

    deck = createDeck();

    playerPoints = 0;
    computerPoints = 0;

    htmlPoints[0].innerText = 0;
    htmlPoints[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnOrder.disabled = false;
    btnStop.disabled = false;


})

