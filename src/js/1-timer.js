import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const dayBlock = document.querySelector('[data-days]');
const hoursBlock = document.querySelector('[data-hours]');
const minutesBlock = document.querySelector('[data-minutes]');
const secondsBlock = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let intervalID = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({ title: 'Error', message: 'Please choose a date in the future', position: 'topRight'});
            startButton.setAttribute('disabled', '');
            startButton.classList.remove('valid-date');
        } else {
            startButton.removeAttribute('disabled', '')
            startButton.classList.add('valid-date')
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
}

function updateTimeBlocks({ days, hours, minutes, seconds }) {
    dayBlock.textContent = addLeadingZero(days);
    hoursBlock.textContent = addLeadingZero(hours);
    minutesBlock.textContent = addLeadingZero(minutes);
    secondsBlock.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
