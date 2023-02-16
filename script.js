const submitButton = document.querySelector(".submit-btn");
const pinGeneratorInput = document.getElementById("generate-pin-input");
const pinMatchingInput = document.getElementById("pin-matching-input");
const numberButtons = document.getElementsByClassName("btn-number");
const clearButtons = document.getElementsByClassName("btn");
const failMsg = document.getElementById("fail-msg");
const successMsg = document.getElementById("success-msg");
const actionLeft = document.querySelector(".action-left");
let action = 3;

// functions.
function getRandomPin() {
  const pin = Math.round(Math.random() * 10000);
  const pinString = pin + "";
  const pinLen = pinString.split("").length;
  if (pinLen !== 4) {
    return getRandomPin();
  } else {
    return pin;
  }
}

document
  .getElementById("generate-pin-btn")
  .addEventListener("click", function () {
    pinMatchingInput.value = "";
    actionLeft.innerText = "3 try left";
    action = 3;
    submitButton.classList.remove("hidden");
    const randomPin = getRandomPin();
    pinGeneratorInput.value = randomPin;
    successMsg.style.display = "none";
    failMsg.style.display = "none";
  });

for (btn of numberButtons) {
  btn.addEventListener("click", (e) => {
    pinMatchingInput.value += e.target.innerText;
    failMsg.style.display = "none";
  });
}

document.querySelector(".btn-delete").addEventListener("click", function () {
  let inputValue = pinMatchingInput.value.split("");
  if (inputValue.length !== 0) {
    inputValue.length = inputValue.length - 1;
    pinMatchingInput.value = inputValue.join("");
    failMsg.style.display = "none";
  }
});
document.querySelector(".btn-clear").addEventListener("click", function () {
  failMsg.style.display = "none";
  pinMatchingInput.value = "";
});

submitButton.addEventListener("click", function () {
  if (pinMatchingInput.value !== "") {
    if (action === 0) {
      this.classList.add("hidden");
      actionLeft.innerText = "please generate new pin";
    } else {
      if (pinMatchingInput.value === pinGeneratorInput.value) {
        action = 3;
        actionLeft.innerText = action + " " + "try left";
        pinMatchingInput.value = "";
        pinGeneratorInput.value = "";
        successMsg.style.display = "block";
        failMsg.style.display = "none";
      } else {
        action--;
        actionLeft.innerText = action + " " + "try left";
        successMsg.style.display = "none";
        failMsg.style.display = "block";
      }
    }
  }
});
