import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as r,i as a}from"./assets/vendor-77e16229.js";const o=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]");document.querySelector("[data-days]");document.querySelector("[data-hours]");document.querySelector("[data-minutes]");document.querySelector("[data-seconds]");const s={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<=new Date?(a.error({title:"Error",message:"Please choose a date in the future"}),e.setAttribute("disabled",""),e.classList.remove("valid-date")):(e.removeAttribute("disabled",""),e.classList.add("valid-date"))}};r(o,s);e.addEventListener("click",()=>{});
//# sourceMappingURL=commonHelpers.js.map
