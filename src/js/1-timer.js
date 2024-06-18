// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
const timeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const dayBlock = document.querySelector('[data-days]');
const hoursBlock = document.querySelector('[data-hours]');
const minutesBlock = document.querySelector('[data-minutes]');
const secondsBlock = document.querySelector('[data-seconds]');

let userSelectedDate;
let intervalID;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
            startButton.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    }
};
flatpickr(timeInput, options);

startButton.addEventListener('click', () => {
    if (!userSelectedDate) return;
    startButton.disabled = true;
    timeInput.disabled = true;

    intervalID = setInterval(() => {
        const currentTime = new Date();
        const diff = userSelectedDate - currentTime;

        if (diff <= 0) {
            clearInterval(intervalID);
            updateTimeBlocks({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            timeInput.disabled = false;
            return;
        }

        const time = convertMs(diff);
        updateTimeBlocks(time);
    }, 1000);
});



// startButton.addEventListener('click', () => {
//     const initTime = Date.now();

//     intervalID = setInterval(() => {
//         const currentTime = Date.now();
//         const diff = currentTime - initTime;
//         const time = convertMs(diff);
//         updateTimeBlocks(time);
//     },1000);
//     startButton.disabled = true;

// });

// function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
  
//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
//     return { days, hours, minutes, seconds };
// }
  
// function updateTimeBlocks({ days, hours, minutes, seconds }) {
//     dayBlock.textContent = String(days).padStart(2, '0');
//     hoursBlock.textContent = String(hours).padStart(2, '0');
//     minutesBlock.textContent = String(minutes).padStart(2, '0');
//     secondsBlock.textContent = String(seconds).padStart(2, '0');
// }