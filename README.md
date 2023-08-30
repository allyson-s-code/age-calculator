# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![screenshot-mobile](./assets/images/screenshot-mobile.png)

![screenshot-desktop](./assets/images/screenshot-desktop.png)

### Links

- Solution URL: [Github Link](https://github.com/allyson-s-code/age-calculator)
- Live Site URL: [Age Calculator](https://allyson-s-code.github.io/age-calculator/)

## My process

I started by looking over the requirements and design files to get a general idea of the functionality of the app. Then, I built out the HTML keeping accessibilty and the interactive elements in mind. I switched gears by working on the form validation and age calculation functions using JS. Styling with CSS came next, as well as lots of testing to ensure the app worked on various screen sizes and with different user input scenerios.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- JavaScript

### What I learned

The Age Calculator App was a good challenge for reviewing and reinforcing JavaScript and form validation, especially working with dates, which I struggle with.

As always problems arose with edge cases. For example, if a user input was valid and calculated and then one of the inputs changed and was no longer valid the error messages showed as expected, but the age output remained from the first valid entry. To account for this I added the `resetOutput()` function at the top of the `addError()` function.

Another issue I had was that the age was being calculated even when there were errors. Thanks to ChatGPT I learned that my `isValidDate()` function was only checking if the date string could be converted into a valid JS Date object- not whether the date components from the inputs were valid when combined. For this I added additional checks to ensure validity:

```js
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

//...

function validate(dayInput, monthInput, yearInput) {
  //...

  // Check overall validity of date
  if (!isValidDate(dayValue, monthValue, yearValue)) {
    addError(dayInput, errorMessages.invalidDate);
  } else {
    removeError(dayInput);
    calculateAge(dayValue, monthValue, yearValue);
  }
}
//...
```

With the styling I learned a new outcome of forms and browser settings. My `fieldset` was larger than it's parent div and to rectify this I learned from my research that I should add a property of `min-width: 0;` to the `fieldset`.

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
