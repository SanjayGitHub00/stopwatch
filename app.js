let startTime,
  updatedTime,
  difference,
  tInterval,
  running = false;

let milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

const hrElem = document.querySelector(".container1 p:nth-of-type(1)");
const minElem = document.querySelector(".container1 p:nth-of-type(2)");
const secElem = document.querySelector(".container1 p:nth-of-type(3)");

const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const continueButton = document.querySelector(".continue");

/**
 * The function `startTimer` initiates a timer by disabling the Start button, setting the start time,
 * and starting an interval to update the displayed time.
 */

function startTimer() {
  if (!running) {
    running = true;
    startButton.disabled = true; // Disable Start button
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
  }
}

/**
 * The function `getShowTime` calculates the elapsed time in hours, minutes, and seconds based on the
 * start time and updates the corresponding HTML elements with the formatted time values.
 */

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  milliseconds = Math.floor((difference % 1000) / 1);
  seconds = Math.floor((difference / 1000) % 60);
  minutes = Math.floor((difference / (1000 * 60)) % 60);
  hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  hrElem.innerHTML = formatTime(hours) + " <span>hr</span>";
  minElem.innerHTML = formatTime(minutes) + " <span>min</span>";
  secElem.innerHTML = formatTime(seconds) + " <span>sec</span>";
}

/**
 * The `formatTime` function pads a single-digit time value with a leading zero if it is less than 10.
 * @param time - Time is a parameter that represents a numerical value, typically used to represent
 * hours, minutes, or seconds in a time format.
 * @returns The `formatTime` function returns a string representation of the time with a leading zero
 * if the time is less than 10.
 */

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

/**
 * The function `stopTimer` stops a timer if it is currently running and re-enables the Start button.
 */
function stopTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
    startButton.disabled = false; // Re-enable Start button
  }
}

/**
 * The function `resetTimer` resets a timer by clearing the interval, setting time values to zero,
 * updating display elements, and re-enabling the Start button.
 */

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  hrElem.innerHTML = "00 <span>hr</span>";
  minElem.innerHTML = "00 <span>min</span>";
  secElem.innerHTML = "00 <span>sec</span>";
  startButton.disabled = false; // Re-enable Start button
}

/**
 * The function `continueTimer` starts the timer and disables the start button if it is not already
 * running.
 */

function continueTimer() {
  if (!running) {
    startButton.disabled = true; // Disable Start button
    startTime =
      new Date().getTime() -
      (milliseconds + seconds * 1000 + minutes * 60000 + hours * 3600000);
    tInterval = setInterval(getShowTime, 1);
    running = true;
  }
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
continueButton.addEventListener("click", continueTimer);
