let titleEl = document.getElementById("title");
let startGamebtn = document.getElementById("startgame");
let newCardbtn = document.getElementById("new-card");
let cardEl = document.querySelector(".card");
let cardsEl = document.querySelector(".cards");
let gameOutcome = document.querySelector(".game-outcome");
let sumEl = document.querySelector(".sum");
let cardDeckEl = document.querySelector(".card-deck");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Game {
  constructor(name) {
    this.name = name;
  }
}

class BlackJackGame extends Game {
  #hasBlackjack;
  constructor(name) {
    super(name);
    titleEl.textContent = name;
    this.#hasBlackjack = false;
    this.isAlive = false;
    this.sum = 0;
    this.cardImages = null;
  }

  getCardImg(num) {
    const numberOfImages = this.cardImages[num].length;
    const randomSrc =
      this.cardImages[num][randomIntFromInterval(0, numberOfImages - 1)];
    return randomSrc;
  }

  getRandomCardValue() {
    let randomNumb = randomIntFromInterval(2, 11);
    this.setCardImg(randomNumb);
    if (randomNumb > 10) {
      return 10;
    } else if (randomNumb === 1) {
      return 11;
    } else {
      return randomNumb;
    }
  }

  setCardImg(num) {
    const randomCardSrc = this.getCardImg(num);
    const newCardEl = `<div class="card-wrapper"><img class="card" src="${randomCardSrc}" alt="" /></div>`;
    cardsEl.innerHTML += newCardEl;
  }

  startGame() {
    this.setCardImagesVariant2();
    cardsEl.innerHTML = "";
    this.#hasBlackjack = false;
    startGamebtn.textContent = "New Game";
    newCardbtn.style.display = "block";
    cardsEl.style.display = "flex";
    this.isAlive = true;
    let firstCard = this.getRandomCardValue();
    let secondCard = this.getRandomCardValue();
    this.cards = [firstCard, secondCard];
    this.sum = firstCard + secondCard;
    console.log(this.sum, this.cards)
    this.checkIfWin();
  }

  newcard() {
    if (this.isAlive === true && this.#hasBlackjack === false) {
      let card = this.getRandomCardValue();
      this.sum += card;
      this.cards.push(card);
      console.log(this.sum, this.cards)
      this.checkIfWin();
    }
  }

  setCardImagesVariant1() {
    this.cardImages = allCards;
  }

  setCardImagesVariant2() {
    this.cardImages = allCards2;
  }

  checkIfWin() {
    sumEl.textContent = "Sum: " + this.sum;
    if (this.sum > 21) {
      this.message = "You've Lost!";
      this.isAlive = false;
      newCardbtn.style.display = "none";
    } else if (this.sum === 21) {
      this.message = "Congratulations!";
      this.#hasBlackjack = true;
      newCardbtn.style.display = "none";
    } else {
      this.message = "Do you want withdraw another card?";
    }
    gameOutcome.textContent = this.message;
  }
}

let game = new BlackJackGame("BlackJack");

function startGame() {
  game.startGame();
}

function newcard() {
  game.newcard();
}

cardDeckEl.addEventListener("click", () => {
  game.setCardImagesVariant2();
})

const allCards = {
  2: [
    "png/2_of_clubs.png",
    "png/2_of_diamonds.png",
    "png/2_of_hearts.png",
    "png/2_of_spades.png",
  ],
  3: [
    "png/3_of_clubs.png",
    "png/3_of_diamonds.png",
    "png/3_of_hearts.png",
    "png/3_of_spades.png",
  ],
  4: [
    "png/4_of_clubs.png",
    "png/4_of_diamonds.png",
    "png/4_of_hearts.png",
    "png/4_of_spades.png",
  ],
  5: [
    "png/5_of_clubs.png",
    "png/5_of_diamonds.png",
    "png/5_of_hearts.png",
    "png/5_of_spades.png",
  ],
  6: [
    "png/6_of_clubs.png",
    "png/6_of_diamonds.png",
    "png/6_of_hearts.png",
    "png/6_of_spades.png",
  ],
  7: [
    "png/7_of_clubs.png",
    "png/7_of_diamonds.png",
    "png/7_of_hearts.png",
    "png/7_of_spades.png",
  ],
  8: [
    "png/8_of_clubs.png",
    "png/8_of_diamonds.png",
    "png/8_of_hearts.png",
    "png/8_of_spades.png",
  ],
  9: [
    "png/9_of_clubs.png",
    "png/9_of_diamonds.png",
    "png/9_of_hearts.png",
    "png/9_of_spades.png",
  ],
  10: [
    "png/10_of_clubs.png",
    "png/10_of_diamonds.png",
    "png/10_of_hearts.png",
    "png/10_of_spades.png",
    "png/jack_of_clubs.png",
    "png/jack_of_diamonds.png",
    "png/jack_of_hearts.png",
    "png/jack_of_spades.png",
    "png/king_of_clubs.png",
    "png/king_of_diamonds.png",
    "png/king_of_hearts.png",
    "png/king_of_spades.png",
    "png/queen_of_clubs.png",
    "png/queen_of_diamonds.png",
    "png/queen_of_hearts.png",
    "png/queen_of_spades.png",
  ],
  11: [
    "png/ace_of_clubs.png",
    "png/ace_of_diamonds.png",
    "png/ace_of_hearts.png",
    "png/ace_of_spades.png",
  ],
};

const allCards2 = {
  2: ["images/2.2.png", "images/2.4.png", "images/2.5.png", "images/2.7.png"],
  3: ["images/3.2.png", "images/3.4.png", "images/3.5.png", "images/3.7.png"],
  4: ["images/4.2.png", "images/4.4.png", "images/4.5.png", "images/4.7.png"],
  5: ["images/5.2.png", "images/5.4.png", "images/5.5.png", "images/5.7.png"],
  6: ["images/6.2.png", "images/6.4.png", "images/6.5.png", "images/6.7.png"],
  7: ["images/7.2.png", "images/7.4.png", "images/7.5.png", "images/7.7.png"],
  8: ["images/8.2.png", "images/8.4.png", "images/8.5.png", "images/8.7.png"],
  9: ["images/9.2.png", "images/9.4.png", "images/9.5.png", "images/9.7.png"],
  10: [
    "images/10.2.png",
    "images/10.4.png",
    "images/10.5.png",
    "images/10.7.png",
    "images/J2.png",
    "images/J4.png",
    "images/J5.png",
    "images/J7.png",
    "images/K2.png",
    "images/K4.png",
    "images/K5.png",
    "images/K7.png",
    "images/Q2.png",
    "images/Q4.png",
    "images/Q5.png",
    "images/Q7.png",
  ],
  11: ["images/A.2.png", "images/A.4.png", "images/A.5.png", "images/A.7.png"],
};
