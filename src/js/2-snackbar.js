"use strict";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', promiseGenerator);

function promiseGenerator(event) {
    event.preventDefault();

    const delay = event.target.delay.value;
    const status = event.target.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(delay => {
            iziToast.success({
                message: `Fulfilled promise in ${delay}ms`,
                messageSize: '16',
                messageColor: '#fff',
                backgroundColor: '#59a10d',
                position: 'topRight',
                close: true,
                closeOnEscape: true,
                closeOnClick: true,
                progressBar: true,
                progressBarColor: '#326101',
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
                messageSize: '16',
                messageColor: '#fff',
                backgroundColor: '#ef4040',
                position: 'topRight',
                close: true,
                closeOnEscape: true,
                closeOnClick: true,
                progressBar: true,
                iconUrl: null,
                iconColor: '#ffffff',
            });
        });
}
