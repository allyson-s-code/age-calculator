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

function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  return !isNaN(dateObject) && dateObject instanceof Date;
}

function validate(dayInput, monthInput, yearInput) {
  const emptyError = "This field is required";
  const invalidDayError = "Must be a valid day";
  const invalidMonthError = "Must be a valid month";
  const invalidYearError = "Must be in the past";
  const invalidDateError = "Must be a valid date";

  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;
  let birthday = `${yearValue}-${monthValue}-${dayValue}`;

  // Check day input
  if (isEmpty(dayValue)) {
    addError(dayInput, emptyError);
    console.log("is Empty");
  } else if (!isEmpty(dayValue)) {
    removeError(dayInput);
    if (dayValue < 1 || dayValue > 31) {
      addError(dayInput, invalidDayError);
    } else {
      removeError(dayInput);
    }
  }

  //check month input
  if (isEmpty(monthValue)) {
    addError(monthInput, emptyError);
  } else if (!isEmpty(monthValue)) {
    removeError(monthInput);
    if (monthValue < 1 || monthValue > 12) {
      addError(monthInput, invalidMonthError);
    } else {
      removeError(monthInput);
    }
  }

  //check year input
  if (isEmpty(yearValue)) {
    addError(yearInput, emptyError);
  } else if (!isEmpty(yearValue)) {
    removeError(yearInput);
    if (yearValue > currentYear) {
      addError(yearInput, invalidYearError);
    } else {
      removeError(yearInput);
    }
  }

  // Check overall validity of date
  if (!isValidDate(birthday)) {
    addError(dayInput, invalidDateError);
  } else if (isValidDate(birthday)) {
    calculateAndDisplayAge(dayValue, monthValue, yearValue);
  }

  console.log(isValidDate(birthday));
}

//calculate age
function calculateAndDisplayAge(dayValue, monthValue, yearValue) {
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

  const displayDays = document.querySelector(".output-days");
  const displayMonths = document.querySelector(".output-months");
  const displayYears = document.querySelector(".output-years");

  displayYears.innerText = `${years}`;
  displayMonths.innerText = `${months}`;
  displayDays.innerText = `${days}`;
  console.log(years, months, days);
}

submit.addEventListener("click", () => {
  validate(dayInput, monthInput, yearInput);
});
