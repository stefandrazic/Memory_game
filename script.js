const app = document.querySelector("#app");
const endGame = document.querySelector("#endGame");
const start = document.querySelector("#start").addEventListener("click", () => {
  location.reload();
});
const totalCards = 12;
const uniqueNumber = totalCards / 2;
const uniqueNumbers = [];
const cards = [];
let totalPairs = totalCards / 2;
let faceUpCards = [];

class Cards {
  element = null;

  constructor(color, number) {
    this.color = color;
    this.number = number;
    this.isFaceUp = false;
    this.init();
  }

  init() {
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.style.height = "100px";
    this.element.style.width = "100px";
    this.element.style.background = this.color;
    this.element.addEventListener("click", () => {
      if (!this.isFaceUp && faceUpCards.length < 2) {
        this.isFaceUp = true;
        this.element.innerHTML = this.number;
        faceUpCards.push(this);
        console.log(faceUpCards);
        if (faceUpCards.length === 2) {
          setTimeout(checkForMatch, 1000);
        }
      }
    });
    app.appendChild(this.element);
  }
}

function checkForMatch() {
  if (faceUpCards[0].element.innerHTML === faceUpCards[1].element.innerHTML) {
    faceUpCards[0].element.style.opacity = "0";
    faceUpCards[1].element.style.opacity = "0";
    faceUpCards = [];
    totalPairs -= 1;
    console.log(totalPairs);
  } else {
    faceUpCards = [];
    cards.forEach((card) => {
      card.element.innerHTML = "";
      card.isFaceUp = false;
    });
  }
  if (totalPairs === 0) {
    cards.forEach((card) => {
      card.element.style.display = "none";
    });
    endGame.style.display = "flex";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

for (i = 0; i < uniqueNumber; i++) {
  let randomNumber = Math.floor(Math.random() * 12);
  while (uniqueNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 10);
  }
  uniqueNumbers.push(randomNumber);
  uniqueNumbers.push(randomNumber);
}

shuffleArray(uniqueNumbers);

for (i = 0; i < totalCards; i++) {
  const card = new Cards("black", uniqueNumbers[0]);
  cards.push(card);
  uniqueNumbers.splice(0, 1);
}
