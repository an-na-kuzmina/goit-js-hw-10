/*
Завдання 1 - Таймер зворотного відліку

Виконуй це завдання у файлах 1 - timer.html і 1 - timer.js. 
Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
Такий таймер може використовуватися у блогах, інтернет - магазинах, сторінках реєстрації подій,
    під час технічного обслуговування тощо. 
Елементи інтерфейсу

Додай в HTML файл розмітку таймера, поля вибору кінцевої дати і кнопку, при кліку на яку таймер повинен запускатися. 
Додай оформлення елементів інтерфейсу згідно з макетом.
    */

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputTimePicker = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
let userSelectedDate;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      startBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 2000,
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputTimePicker, options);
startBtn.addEventListener('click', startBtnClikHandler);

function startBtnClikHandler(event) {
  startBtn.disabled = true;
  inputTimePicker.disabled = true;
  const intervalId = setInterval(() => {
    const dateDiff = userSelectedDate - Date.now();
    if (dateDiff <= 0) {
      inputTimePicker.disabled = false;
      return clearInterval(intervalId);
    }
    const convertedDateDiff = convertMs(dateDiff);
    updatedTimer(convertedDateDiff);
  }, 1000);
}

function updatedTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = String(days).padStart(2, 0);
  dataHours.textContent = String(hours).padStart(2, 0);
  dataMinutes.textContent = String(minutes).padStart(2, 0);
  dataSeconds.textContent = String(seconds).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
