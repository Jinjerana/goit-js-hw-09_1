// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
//  Такий таймер може використовуватися у блогах та інтернет-магазинах, 
//  сторінках реєстрації подій, під час технічного обслуговування тощо. 
//  Подивися демо-відео роботи таймера.

// TIMER

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';


  const calendar = document.querySelector('#datetime-picker');
  const startBtn = document.querySelector('button[data-start]');
  
  // const timer = document.querySelector('.timer');
  // const days = document.querySelector('value[data-days]');
  // const hours = document.querySelector('value[data-hours]');
  // const minutes = document.querySelector('value[data-minutes]');
  // const seconds = document.querySelector('value[data-seconds]');

  refs = {
    timer: document.querySelector('.timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  }
  
  // const timer = document.querySelector('.timer');
  // const days = document.querySelector('value[data-days]');
  // const hours = document.querySelector('value[data-hours]');
  // const minutes = document.querySelector('value[data-minutes]');
  // const seconds = document.querySelector('value[data-seconds]');


const TIMER_DELAY = 1000;
let isActive = false;
// let intervalId = null;
// let selectedDate = null;
// let currentDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isActive) {
      return
    }
    if (selectedDates[0] - Date.now() < 0) {
      Report.failure(
        '🥺 Ooops...',
        'Please, choose a date in the future',
        'Okay',
        TIMER_DELAY
      );

    } else {
      Report.success(
        '🥰 Congratulations! Click on start!',
        'Try.',
        'Okay'
      ),
      startBtn.disabled = false; 
    }
  },
};

const fp = flatpickr(calendar, options);

function setTimer() {
  let delta = fp.selectedDates[0] - Date.now();
  const id = setInterval(() => {
    updateTimer(delta);
    setTimeout(() => {
      clearInterval(id)
    }, delta);
    delta -= 1000;
  }, 1000); 
  isActive = true;
}

startBtn.addEventListener('click', startTimer);

  function startTimer() {
    setTimer();
    startBtn.disabled = true;
    calendar.disabled = true;
  } 
  // selectedDate = selectedDates[0].getTime();
  // refs.timer.start();


// const timerT = () => {
//   refs.timer,
//   start() {
//     intervalId = setInterval(() => {
//       refs.startBtn.disabled = true;
//       refs.calendar.disabled = true;
//       currentDate = Date.now();
//       const delta = selectedDate - currentDate;

//       if (delta <= 0) {
//         stop();
//         Report.info(
//           '👏 Congratulation! Timer stopped!',
//           'Please, choose a date and click on start',
//           'Okay'
//         );
//         return;
//       }
function updateTimer(delta) {      
const { days, hours, minutes, seconds } = convertMs(delta);
      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);
}
      // const { days, hours, minutes, seconds } = this.convertMs(delta);
      // this.rootSelector.querySelector('[data-days]').textContent =
      //   this.addLeadingZero(days);
      // this.rootSelector.querySelector('[data-hours]').textContent =
      //   this.addLeadingZero(hours);
      // this.rootSelector.querySelector('[data-minutes]').textContent =
      //   this.addLeadingZero(minutes);
      // this.rootSelector.querySelector('[data-seconds]').textContent =
      //   this.addLeadingZero(seconds);
    // }, TIMER_DELAY);
  // },

  // function stop() {
  //   clearInterval(intervalId);
  //   intervalId = null;
  //   refs.startBtn.disabled = true;
  //   refs.calendar.disabled = false;
  // };

  

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  };

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };
