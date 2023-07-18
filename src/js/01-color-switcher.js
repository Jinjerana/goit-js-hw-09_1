// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір 
// фону <body> на випадкове значення, використовуючи інлайн стиль. 
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const bodyCol = document.querySelector("body");
let timId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

stopBtn.disabled = true;
startBtn.addEventListener("click", playStart);
stopBtn.addEventListener("click", playStop);

function playStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timId = setInterval(() => { bodyCol.style.backgroundColor = getRandomHexColor() },1000)
}

function playStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timId);
}