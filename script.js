let titleEl = document.getElementById("title");
let cardsEl = document.querySelector(".cards");
let startGamebtn = document.getElementById("startgame");
let startNewGamebtn = document.getElementById("startNewGame");
let newCardbtn = document.getElementById("new-card");
let scoreEl = document.querySelector(".score");
let gameOutcome = document.querySelector(".game-outcome");
let betForm = document.getElementById("bet-form");
let betInputEl = document.querySelector(".bet-input");
let betEl = document.querySelector(".bet");
let countdownEl = document.getElementById("countdown");
let counterEl = document.getElementById("click-counter");

function generateDeck() {
  const suits = ["spades", "clubs", "diamonds", "hearts"];
  const values = [
    { name: "two", value: 2 },
    { name: "three", value: 3 },
    { name: "four", value: 4 },
    { name: "five", value: 5 },
    { name: "six", value: 6 },
    { name: "seven", value: 7 },
    { name: "eight", value: 8 },
    { name: "nine", value: 9 },
    { name: "ten", value: 10 },
    { name: "jack", value: 10 },
    { name: "queen", value: 10 },
    { name: "king", value: 10 },
    { name: "ace", value: 11 },
  ];

  return suits.flatMap((suit) =>
    values.map(({ name, value }) => ({
      name: `${name}_${suit}`,
      value,
      img: `images/cards/${name}-${suit}.png`,
    }))
  );
}

class Game {
  constructor(name) {
    this.name = name;
  }
}

class BlackJackGame extends Game {
  constructor(name) {
    super(name);
    titleEl.textContent = name;
    this.initialDeck = generateDeck();
    this.deck = [...this.initialDeck];
    this.cards = [];
    this.score = 0;
    this.bet = 0;
    this.chancesToContinue = 1;
  }

  startGame() {
    this.cards = [this.drawCard(), this.drawCard()];
    cardsEl.innerHTML = this.displayPlayerCards();
    newCardbtn.style.display = "block";
    this.updateScore();
    if (this.hasPlayerWon()) {
      this.updateBet(3);
    }
  }

  drawCard() {
    if (this.deck.length === 0) {
      console.log("No cards left in the deck.");
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const [randomCard] = this.deck.splice(randomIndex, 1);

    this.cards.push(randomCard);
    this.updateScore();

    return randomCard;
  }

  updateScore() {
    let aces = 0;
    let score = this.cards.reduce((acc, cur) => {
      if (cur.name === "Ace") {
        aces += 1;
        return acc + 11;
      }
      return acc + cur.value;
    }, 0);

    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }

    this.score = score;
  }

  hasPlayerLost() {
    if (this.score > 21 || this.cards.length > 5) {
      newCardbtn.style.display = "none";
      if (this.chancesToContinue >= 1) {
        const extraLife = this.getExtraLife();
        if (extraLife) {
          return false;
        } else {
          return true;
        }
      } else {
        this.updateBet(0);
        return true;
      }
    } else {
      return false;
    }
  }

  hasPlayerWon() {
    if (this.score === 21) {
      newCardbtn.style.display = "none";
      this.updateBet(2);
      return true;
    } else {
      return false;
    }
  }

  getDeck() {
    return this.deck;
  }

  getPlayerCards() {
    return this.cards;
  }

  getPlayerScore() {
    return this.score;
  }

  displayPlayerCards() {
    let cards = "";
    for (let card of this.getPlayerCards()) {
      cards += `<div class="card"><img src="${card.img}" alt="${card.name}" /></div>`;
    }
    return cards;
  }

  getOutcome() {
    if (this.hasPlayerWon()) {
      return "Congratulations! You won!";
    } else if (this.hasPlayerLost()) {
      return "You've Lost!";
    } else {
      return "Do you want withdraw another card?";
    }
  }

  setBet(bet) {
    if (Number(bet) > 0) {
      this.bet += Number(bet);
      startGamebtn.style.display = "block";
      return true;
    }
  }

  getBet() {
    return this.bet;
  }

  updateBet(multiplyBy) {
    this.bet *= multiplyBy;
  }

  getExtraLife() {
    const playerConfirm = confirm(
      "You lost. Want to try again? (You need to click button 21 times within 5 seconds)"
    );
    if (!playerConfirm) {
      return false;
    }

    counterEl.style.display = "block";
    countdownEl.style.display = "block";
    let timeleft = 5;
    let counter = 0;
    let extraLife = false;

    const clickHandler = () => {
      counter++;
      counterEl.textContent = counter;
      if (counter >= 21) {
        extraLife = true;
        counterEl.style.display = "none";
        this.cards.pop();
        this.updateScore();
        this.getOutcome();
        scoreEl.textContent = "Score: " + game.getPlayerScore();
        gameOutcome.textContent = game.getOutcome();
        cardsEl.innerHTML = game.displayPlayerCards();
        betEl.textContent = "Your Bet: " + game.getBet();
        newCardbtn.style.display = "block";
        countdownEl.style.display = "none";
        clearInterval(extraLifeTimer);
        this.chancesToContinue -= 1;
      }
    };

    counterEl.addEventListener("click", clickHandler);

    const extraLifeTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(extraLifeTimer);
        counterEl.removeEventListener("click", clickHandler);
        countdownEl.style.display = "none";
        counterEl.style.display = "none";
        if (!extraLife) {
          countdownEl.innerHTML = "Time's up! You didn't earn an extra life.";
          window.location.reload();
        }
      } else {
        countdownEl.style.display = "block";
        countdownEl.innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);

    return extraLife;
  }
}

const game = new BlackJackGame("BlackJack");

function startGame() {
  game.startGame();
  scoreEl.textContent = "Score: " + game.getPlayerScore();
  gameOutcome.textContent = game.getOutcome();
  betEl.textContent = "Your Bet: " + game.getBet();
  startNewGamebtn.style.display = "block";
  startGamebtn.style.display = "none";
  betForm.style.display = "none";
  if (game.hasPlayerWon()) {
    return;
  }
  let timeleft = 5;
  const gameStartTimer = setInterval(function () {
    countdownEl.style.display = "block";
    if (timeleft <= 0) {
      clearInterval(gameStartTimer);
      if (game.getPlayerCards().length === 2) {
        window.location.reload();
      }
    } else {
      if (game.getPlayerCards().length > 2) {
        countdownEl.style.display = "none";
        clearInterval(gameStartTimer);
      }
      countdownEl.innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);
}

function newcard() {
  game.drawCard();
  cardsEl.innerHTML = game.displayPlayerCards();
  scoreEl.textContent = "Score: " + game.getPlayerScore();
  gameOutcome.textContent = game.getOutcome();
  betEl.textContent = "Your Bet: " + game.getBet();
}

betForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const betIsSet = game.setBet(betInputEl.value);
  betInputEl.value = "";
  if (betIsSet) {
    betEl.textContent = "Your Bet: " + game.getBet();
  }
});
