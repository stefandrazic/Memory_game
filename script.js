//Selektovani divovi u HTML-u i dodato dugme za reload stranice
//Odredjujemo broj za svaki par, pravimo niz za brojeve, kartice, okrenute kartice i broj parova.

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

//Pravimo klasu za karticu da izbegnemo ponavljanje koda. U konstruktoru odredjujemo boju kartica i broj koji ce sadrzati. isFaceUp nam govori da li je kartica okrenuta.

class Cards {
  element = null;

  constructor(color, number) {
    this.color = color;
    this.number = number;
    this.isFaceUp = false;
    this.init();
  }

  //Odredjujemo osnovne stilove kartice, prikazujemo je unutar aplikacije i dodajemo eventListener na klik ako nije vec kliknuta i ako nisu aktivno okrenute vise od 2 kartice. Menja se isFaceUp varijabla u true, ispisuje broj u kartici, dodaje se u niz trenutno okrenutih kartica. Kada su okrenute 2 kartice, nakon sekunde proveravamo da li se okrenute kartice podudaraju.

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

//Funkcija za proveru podudaranja kartica u nizu okrenutih kartica. Ako se kartice podudaraju, sakrivamo ih, praznimo niz aktivnih kartica i smanjujemo parove za 1. Ukoliko se ne podudaraju, brisemo sve prikaze brojeva kartica i praznimo niz kartica. Ukoliko brojac parova dodje do 0, brisemo sve kartice sa ekrana i prikazujemo div za kraj igre.

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

//Funkcija za mesanje redosleda indexa u nizu.

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//Generisemo broj za svaki par u nizu, broj mora biti jedinstven za svaki par. Svaki broj dodajemo u niz 2 puta, za svaku karticu po 1.

for (i = 0; i < uniqueNumber; i++) {
  let randomNumber = Math.floor(Math.random() * 12);
  while (uniqueNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 10);
  }
  uniqueNumbers.push(randomNumber);
  uniqueNumbers.push(randomNumber);
}

//Pozivamo funkciju da promesa niz sa jedinstvenim brojevima da se ne bi stvarale kartice jedna pored druge.

shuffleArray(uniqueNumbers);

//Pravimo zeljeni broj kartica, svaka kartica uzima prvi broj u promesanom nizu, ulazi u niz sa karticama i izbacuje broj uzet iz niza.

for (i = 0; i < totalCards; i++) {
  const card = new Cards("black", uniqueNumbers[0]);
  cards.push(card);
  uniqueNumbers.splice(0, 1);
}
