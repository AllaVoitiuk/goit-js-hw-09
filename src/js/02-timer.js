import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

 const input = document.querySelector("#datetime-picker");
 const startBtn = document.querySelector("[data-start]");
// const timerBox = document.querySelector(".timer");
 const daysValue = document.querySelector("[data-days]");
 const hoursValue = document.querySelector("[data-hours]");
 const minutesValue = document.querySelector("[data-minutes]");
 const secondsValue = document.querySelector("[data-seconds]");

const currentDate = new Date();
let selectedDate = new Date();
console.log("currentDate: " + currentDate);

const timer = {
    intervalId: null,
    isActive: false,
    start() {

    this.isActive = true;
    this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedDate.getTime() - currentTime

        if (deltaTime <= 0){
            
            clearInterval(this.intervalId);
            this.isActive = false;
            const time = this.convertMs(0);
         
        }
        console.log("Time: " + deltaTime);            
        const {days, hours, minutes, seconds} = convertMs(deltaTime);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);

        daysValue.textContent = addLeadingZero(days);
        hoursValue.textContent = addLeadingZero(hours);
        minutesValue.textContent = addLeadingZero(minutes);
        secondsValue.textContent = addLeadingZero(seconds);

    }, 1000);
    },
}
function addLeadingZero(value){
    return String(value).padStart(2,"0");
}

startBtn.disabled = true; 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {         
        if (currentDate < selectedDates[0]){
            startBtn.disabled = false;
            selectedDate = selectedDates[0];
        }
        else{
            //window.alert("Please choose a date in the future"); 
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        }       
    },
  };

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
    timer.start();
})

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


