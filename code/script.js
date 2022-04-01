// Practica 01 -> Cristian Pérez Petersen

// Evolucionamos cçodigo a partir del Diagrama de Flujo.

// ELEMENTOS "DOM" A VARIABLES
// Variable que recoge la tirada del dado.
const btnRollDice = document.querySelector('.btn--roll');

// Variable que recoge la retención del marcador parcial.
const btnHoldCurrentScore = document.querySelector('.btn--hold');

// Variable que recoge el comienzo de un nuevo juego.
const btnNewGame = document.querySelector('.btn--new');

// Variable que recoge la imagen de la tirada del dado.
const diceDOMElement = document.querySelector('.dice');

// Variable que recoge el marcador parcial actual del jugador 1.
const currentPlayer0DOMElement = document.querySelector('#current--0');

// Variable que recoge el marcador parcial actual del jugador 2.
const currentPlayer1DOMElement = document.querySelector('#current--1');

// Variable que recoge el marcador total del jugador 1.
const scorePlayer0DOMElement = document.querySelector('#score--0');

// Variable que recoge el marcador total del jugador 2.
const scorePlayer1DOMElement = document.querySelector('#score--1');

// Variable que recoge las sección del jugador 1.
const player0DOMElement = document.querySelector('.player--0');

// Variable que recoge las sección del jugador 2.
const player1DOMElement = document.querySelector('.player--1');

// Variable para recoger marcadores de ambos jugadores
let scores;

// Variable que recoge el marcador actual (inicialmente utilizable para los dos jugadores)
let currentScore;

// Variable que recoge que jugador está tirando los dados (inicialmente utilizable para los dos jugadores)
let activePlayer;

// Variable que me reconoce si el juego está activo o no
let activeGame;

// Función para iniciar el juego, poniendo los marcadores a "0".
const init = function () {
  scores = [0, 0]; // Marcador total de ambos jugadores
  currentScore = 0; // Marcador parcial del jugador
  activePlayer = 0; // Jugador 1 o 2.
  activeGame = true; // Activamos el juego.

  // FORMA 1 de Iniciar los valores a "0".
  currentPlayer0DOMElement.textContent = 0;
  currentPlayer1DOMElement.textContent = 0;
  scorePlayer0DOMElement.textContent = 0;
  scorePlayer1DOMElement.textContent = 0;

  // FORMA 2 de Iniciar los valores a "0".
  // for (const elementsDOM of [
  //   currentPlayer0DOMElement,
  //   currentPlayer1DOMElement,
  //   scorePlayer0DOMElement,
  //   scorePlayer1DOMElement,
  // ])
  //   elementsDOM.textContent = 0;

  diceDOMElement.classList.add('hidden'); // Nada más empezar el juego, NO muestro ninguna imagen de tirada de dado

  // FORMA 1 de descativar la clase "player--winner".
  player0DOMElement.classList.remove('player--winner');
  player1DOMElement.classList.remove('player--winner');

  // FORMA 2 de descativar la clase "player--winner".
  // for (const playerEl of [player0El, player1El])
  //   playerEl.classList.remove('player--winner'); // Desactivamos la "clase" a ambos jugadores

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active'); // Activamos la "clase" del jugador activo
};

// Función para cambiar de jugador
const switchPlayer = function () {
  currentScore = 0; // Inicializamos el marcador parcial a "0"
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  // FORMA 1 con Operador Ternario
  activePlayer = activePlayer === 0 ? 1 : 0; // Operador Ternario que me cambia el jugador

  // FORMA 2 más corta aprovechando "Coertion Type"
  // activePlayer = activePlayer ? 0 : 1

  // FORMA 1
  player0DOMElement.classList.toggle('player--active');
  player1DOMElement.classList.toggle('player--active');

  // FORMA 2 con un bucle for para hacerlo "más sencillo"
  // for (const playerEl of [player0El, player1El])
  //   playerEl.classList.toggle('player--active');
};

init();

// Generamos la tirada del dado y recogemos el evento por medio del "click".
btnRollDice.addEventListener('click', function () {
  if (activeGame) {
    const dice = Math.floor(Math.random() * 6 + 1); // Variable que recoge la tirada del dado generada aleatoriamente.
    diceDOMElement.src = `dice-${dice}.png`; // Cambiamos la imagen del dado.
    diceDOMElement.classList.remove('hidden'); // Habilito la visualización de la imagen cona tirada del dado.
    if (dice !== 1) {
      // Añadimos la tirada al marcador actual.
      currentScore += dice;
      // Mostramos el nuevo marcador.
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Cambiamos de Jugador
      switchPlayer();
    }
  }
});

// Función para retener marcador parcial
btnHoldCurrentScore.addEventListener('click', function () {
  if (activeGame) {
    scores[`${activePlayer}`] += currentScore; // Sumamos el marcador parcial al marcador total del jugador activo.
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`]; // Pasamos la información al documento para que sea visible

    if (scores[`${activePlayer}`] >= 100) {
      // Evaluamos si el jugador activo ha llegado o superado los 100 puntos para proclamarlo ganador del juego
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // Activamos la clase para jugador "GANADOR"
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active'); // Desactivamos la clase para jugador "ACTIVO"
      activeGame = false;
    } else {
      switchPlayer(); // Cambiamos de jugador
    }
  }
});

// CLPP -> Función para un nuevo juego.
btnNewGame.addEventListener('click', function () {
  init();
});
