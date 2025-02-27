// **********************  GENERAL  ********************** //
import data from "../data/data.json" assert { type: "json" };

const overlay = document.querySelector("[data-js=overlay]");
const input = document.getElementById("inputVelocity");

const endPosition = document.querySelector(".final-position");
const halfTimeText = document.querySelector(".half-time-text");
const foxConstVelocityText = document.querySelector(".fox-const-velocity-text");
const distBetweenFoxArmadillo = document.querySelector(
  ".dist-between-fox-armadillo"
);

// **********************  OBJECTS  ********************** //
const armadillo = document.getElementById("object");
const fox = document.getElementById("object2");

// **********************  BUTTONS  ********************** //
const intoGameButton = document.getElementById("start-button");
const confirmAnswertButton = document.querySelector("[data-js=confirmAnswert]");
const submitLogicButton = document.querySelector("#data-submit-logic");

// **********************  DATA  ********************** //
let index = 0;
const lastChallenge = data.length - 1
let attempts = 1

foxConstVelocityText.innerHTML = data[index].foxVelocity;
halfTimeText.innerHTML = data[index].crashTime;
distBetweenFoxArmadillo.innerText = data[index].distBetweenFoxAndArmadillo;
endPosition.innerHTML = data[index].positionUntilEnd;

const lostVelocity = 27
let armadilloVelocity = 30;
const armadilloPosition = 0;
const foxVelocity = 41;
const foxPosition = -450;

let time = 0;

let difference = 0; // variável que guarda a diferença das posições
let position = 0;

// **********************  GAME  ********************** //
class Game {
  constructor(armadillo, fox) {
    this.armadillo = armadillo;
    this.fox = fox;
  }

  displayGameContainer() {
    document.querySelector("main").style.backgroundImage = "none";
    document
      .getElementById("initial-screen")
      .classList.replace("d-flex", "d-none");
    document
      .querySelector("[data-js=game-screen]")
      .classList.replace("d-none", "d-flex");
  }

  displayGameContainerStart() {
    document
      .getElementById("initial-screen")
      .classList.replace("d-none", "d-flex");
    document
      .getElementById("start-button")
      .classList.replace("d-none", "d-flex");
    document
      .querySelector("[data-js=game-screen]")
      .classList.replace("d-flex", "d-none");
  }

  startGame() {
    armadillo.classList.add("isMove");
    fox.classList.add("foxIsMove");
    const moveObjects = () => {
      // Calculando a posição dos objetos pela equação horária da posição
      position = armadilloPosition + armadilloVelocity * time;

      // Quando a resposta estiver errada, calcula a diferença de posição
      if (difference > position) {
        position = difference + armadilloVelocity;
      }

      this.armadillo.style.left = `${position}px`;
      this.fox.style.left = `${foxPosition + foxVelocity * time}px`;

      if (time == 20) {
        clearInterval(mru);
        setTimeout(() => {
          overlay.classList.replace("d-none", "d-block");
          armadillo.classList.remove("isMove");
          fox.classList.remove("foxIsMove");
          input.focus()
        }, 800);
      }

      // Fazendo a raposa parar quando sua posição for muito próxima da posição do Tatu e a resposta do usuário estiver errada
      if (parseInt(this.fox.style.left) > parseInt(this.armadillo.style.left)) {
        clearInterval(mru);
        this.fox.style.left = `${parseInt(this.fox.style.left) - 100}px`;
        setTimeout(() => {
          armadillo.classList.remove("isMove");
          fox.classList.remove("foxIsMove");
        }, 800);
      }

      // Quando a resposta estiver certa, o jogo acaba no tempo de 40s
      if (time == data[index].finalTime) {
        clearInterval(mru);
        this.fox.style.left = "1080px";

      }
      time++;
    };

    const mru = setInterval(moveObjects, 1000 / 60);
  }

  reset() {
    armadilloVelocity = 30;
    this.armadillo.style.left = `${armadilloPosition}px`;
    this.fox.style.left = `${foxPosition}px`;
    position = 0;
    difference = 0;
    time = 0;
    input.value = "";
    confirmAnswertButton.disabled = true;
    setTimeout(() => {
      game.startGame();
    }, 3000);
  }
}

const game = new Game(armadillo, fox);

intoGameButton.addEventListener("click", () => {
  game.displayGameContainer();
  setTimeout(() => {
    game.startGame();
  }, 1000);
});

input.addEventListener("input", (e) => {
  let numValue = parseFloat(e.target.value);
  if (
    e.target.value != "" &&
    !isNaN(numValue)
  ) {
    confirmAnswertButton.disabled = false;
  } else {
    confirmAnswertButton.disabled = true;
  }
});

confirmAnswertButton.addEventListener("click", () => {
  overlay.classList.replace("d-block", "d-none");
  let num = 0;
  const selectInputValue = input.value;
  const numValue = selectInputValue;
  num = parseFloat(numValue);
  if (num != data[index].armadilloVelocity) {
    armadilloVelocity = lostVelocity;
    difference = position;
    game.startGame();
    setTimeout(() => {

      if(attempts == 3){
        if (index == lastChallenge) {
          var completeChallengeModalElement =
            document.getElementById("completeChallenge");
          var completeChallengeModal = new bootstrap.Modal(
            completeChallengeModalElement
          );
          completeChallengeModal.show();
        }
        var elementModalAttempts = document.getElementById("modalAttempts")
        var modalAttempts = new bootstrap.Modal(elementModalAttempts)
        modalAttempts.show()
      } else {
        var modalElement = document.getElementById("meuModal2");
        var modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 1500);
  } else {
    game.startGame();
    setTimeout(() => {
      var modalElement = document.getElementById("meuModal");
      var modal = new bootstrap.Modal(modalElement);

      if (index < lastChallenge) {
        modal.show();
      }

      if (index == lastChallenge) {
        var completeChallengeModalElement =
          document.getElementById("completeChallenge");
        var completeChallengeModal = new bootstrap.Modal(
          completeChallengeModalElement
        );
        completeChallengeModal.show();
      }

      armadillo.classList.remove("isMove");
      fox.classList.remove("foxIsMove");
    }, 1500);
  }
  const answerOfTheTime = document.getElementById(`${index + 1}_challenge`)
  answerOfTheTime.value = `Resposta certa: ${data[index].armadilloVelocity} - Resposta enviada: ${selectInputValue} - Número de tentativas: ${attempts}` 
});

document.addEventListener("DOMContentLoaded", function () {
  var botaoReset = document.getElementById("btreset");
  botaoReset.addEventListener("click", resetGame);
});

function resetGame() {
    attempts++;
    game.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  var botaoReset = document.getElementById("btGo");
  botaoReset.addEventListener("click", nextGame);
});

document.addEventListener("DOMContentLoaded", function () {
  var botaoReset = document.getElementById("newAttempts");
  botaoReset.addEventListener("click", nextGame);
});


submitLogicButton.addEventListener("click", () => {
  console.log("Game Finalizado Com sucesso!")
})

function nextGame() {
  index++;
  attempts = 1;
  armadilloVelocity = 30;
  foxConstVelocityText.innerHTML = data[index].foxVelocity;
  halfTimeText.innerHTML = data[index].crashTime;
  distBetweenFoxArmadillo.innerText = data[index].distBetweenFoxAndArmadillo;
  endPosition.innerHTML = data[index].positionUntilEnd;

  game.reset();
}
