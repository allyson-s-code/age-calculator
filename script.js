//grab the inputs

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const inputs = document.querySelectorAll("input");
const submit = document.querySelector(".age-btn");

//validate each:

//listen

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

function calculateAge(dateString) {
  const now = new Date();
  console.log(dateString);
  const diff = new Date(now.valueOf() - dateString.valueOf());
  return Math.abs(diff.getFullYear() - 1970);
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

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();

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
    calculateAge(birthday);
    //displayAgeDetails(birthday);
  }

  // (e.g., check if the date is valid using a library like "date-fns" or "moment.js")
  // This part is not implemented in the provided code.
}

//check overall validity of date

//Any field is empty when the form is submitted
//The day number is not between 1-31
//The month number is not between 1-12
//The year is in the future
//The date is invalid e.g. 31/04/1991 (there are 30 days in April)

//calculate years, months, days
//display
//dayInput.addEventListener("keyup", validate);
//monthInputInput.addEventListener("keyup", validate);
//yearInput.addEventListener("keyup", validate);
submit.addEventListener("click", () => {
  validate(dayInput, monthInput, yearInput);
});
