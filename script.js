//grab the inputs

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const inputs = document.querySelectorAll("input");
const submit = document.querySelector(".age-btn");

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function addError(elem, error) {
  //reset output
  resetOutput();
  elem.nextElementSibling.setAttribute("aria-hidden", "false");
  inputs.forEach((input) => (input.style.borderColor = "hsl(0, 100%, 67%)"));
  inputs.forEach((input) =>
    input.previousElementSibling.classList.add("error")
  );
  elem.nextElementSibling.innerText = error;
}

function removeError(elem) {
  inputs.forEach((input) => (input.style.borderColor = "hsl(0, 0%, 86%)"));
  elem.nextElementSibling.setAttribute("aria-hidden", "true");
  elem.nextElementSibling.innerText = "";
  inputs.forEach((input) =>
    input.previousElementSibling.classList.remove("error")
  );
}

const isEmpty = (value) => (value === "" ? true : false);

function isValidDate(day, month, year) {
  const maxDaysInMonth = daysInMonths[month - 1];
  return (
    !isNaN(year) &&
    !isNaN(month) &&
    !isNaN(day) &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= maxDaysInMonth
  );
}

function validate(dayInput, monthInput, yearInput) {
  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;

  const errorMessages = {
    empty: "This field is required",
    invalidDay: "Must be a valid day",
    invalidMonth: "Must be a valid month",
    invalidYear: "Must be in the past",
    invalidDate: "Must be a valid date",
  };

  // Clear the animation interval
  clearInterval(counting);

  // Check day input
  if (isEmpty(dayValue)) {
    addError(dayInput, errorMessages.empty);
    console.log("is Empty");
  } else if (!isEmpty(dayValue)) {
    removeError(dayInput);
    if (dayValue < 1 || dayValue > 31) {
      addError(dayInput, errorMessages.empty);
    } else {
      removeError(dayInput);
    }
  }

  //check month input
  if (isEmpty(monthValue)) {
    addError(monthInput, errorMessages.empty);
  } else if (!isEmpty(monthValue)) {
    removeError(monthInput);
    if (monthValue < 1 || monthValue > 12) {
      addError(monthInput, errorMessages.invalidMonth);
    } else {
      removeError(monthInput);
    }
  }

  //check year input
  if (isEmpty(yearValue)) {
    addError(yearInput, errorMessages.empty);
  } else if (!isEmpty(yearValue)) {
    removeError(yearInput);
    if (yearValue > currentYear) {
      addError(yearInput, errorMessages.invalidYear);
    } else {
      removeError(yearInput);
    }
  }

  // Check overall validity of date
  if (!isValidDate(dayValue, monthValue, yearValue)) {
    addError(dayInput, errorMessages.invalidDate);
  } else {
    removeError(dayInput);
    calculateAge(dayValue, monthValue, yearValue);
  }

  console.log(isValidDate(dayValue, monthValue, yearValue));
}

//calculate age
function calculateAge(dayValue, monthValue, yearValue) {
  if (dayValue > currentDay) {
    currentDay = currentDay + daysInMonths[currentMonth - 1];
    currentMonth = currentMonth - 1;
  }

  if (monthValue > currentMonth) {
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  const days = currentDay - dayValue;
  const months = currentMonth - monthValue;
  const years = currentYear - yearValue;

  updateDataCount(days, months, years);
}

function updateDataCount(days, months, years) {
  const displayDays = document.querySelector(".output-days");
  const displayMonths = document.querySelector(".output-months");
  const displayYears = document.querySelector(".output-years");

  displayYears.dataset.count = years;
  displayMonths.dataset.count = months;
  displayDays.dataset.count = days;

  updateDisplay();
}

let counting;

function updateDisplay() {
  const counters = document.querySelectorAll(".output-age");

  counters.forEach((counter) => {
    const finalCount = parseInt(counter.dataset.count);

    console.log(finalCount);
    console.log(counter.innerText);

    updateCounting(counter, finalCount);
  });
}

function updateCounting(counter, finalCount) {
  let initialCount = 0;

  counting = setInterval(() => {
    initialCount++;
    counter.innerText = `${initialCount}`;

    console.log(initialCount);
    console.log(finalCount);
    if (initialCount >= finalCount) {
      resetCounting(counting);
    }
  }, 50);
}

function resetCounting() {
  clearInterval(counting); //Clear the interval using the shared counting variable
}

function resetOutput() {
  const displayDays = document.querySelector(".output-days");
  const displayMonths = document.querySelector(".output-months");
  const displayYears = document.querySelector(".output-years");

  displayYears.dataset.count = "";
  displayYears.innerText = "--";

  displayMonths.dataset.count = "";
  displayMonths.innerText = "--";

  displayDays.dataset.count = "";
  displayDays.innerText = "--";
}

submit.addEventListener("click", () => {
  validate(dayInput, monthInput, yearInput);
});
