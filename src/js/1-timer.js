import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dayBlock = document.querySelector('[data-days]');
const hoursBlock = document.querySelector('[data-hours]');
const minutesBlock = document.querySelector('[data-minutes]');
const secondsBlock = document.querySelector('[data-seconds]');

let userSelectedDate;
let timeInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            startBtn.setAttribute('disabled', '');
            startBtn.classList.remove('right-date');
            iziToast.error({
                message: 'Please choose a date in the future',
                backgroundColor: '#ef4040',
                messageColor: '#fff',
                messageSize: '16',
                imageWidth: 302,
                close: true,
                closeOnEscape: true,
                closeOnClick: true,
                progressBar: true,
                progressBarColor: '#b51b1b',
                transitionIn: 'flipInX',
                transitionOut: 'flipOutX',
                position: 'topRight',
                iconUrl: imageUrl,
                iconColor: '#FAFAFB',
            });
        } else {
            startBtn.removeAttribute('disabled');
            startBtn.classList.add('valid-date');
        }
        console.log(userSelectedDate);
    }
};

flatpickr(timeInput, options);

startBtn.addEventListener('click', () => {
    if (timeInterval) clearInterval(timeInterval);
    startBtn.setAttribute('disabled', '');
    startBtn.classList.remove('valid-date');
    timeInput.setAttribute('disabled', '');

    timeInterval = setInterval(() => {
        const currentTime = new Date();
        const ms = userSelectedDate.getTime() - currentTime.getTime();

        if (ms < 0) {
            clearInterval(timeInterval);
            timeInput.removeAttribute('disabled');
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor((ms % hour) / minute);
        const seconds = Math.floor((ms % minute) / second);

        dayBlock.textContent = String(days).padStart(2, '0');
        hoursBlock.textContent = String(hours).padStart(2, '0');
        minutesBlock.textContent = String(minutes).padStart(2, '0');
        secondsBlock.textContent = String(seconds).padStart(2, '0');
    }, 1000);
});
