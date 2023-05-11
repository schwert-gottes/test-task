function multiplyByClosure(mult) {
  const values = [0, 0.5, 1, 2, 3, 4, 5, "a", false];
  return values.map(function (value) {
    if (typeof value === "number") {
      return value * mult;
    }
    return value;
  });
}

function countZeroValues(values) {
  return values.filter(function (value) {
    return value === 0; // Use strict equality (===) to compare values
  }).length;
}

const multiplyByTwo = multiplyByClosure(2);
console.log(multiplyByTwo);

const multiplyByThree = multiplyByClosure(3);
console.log(multiplyByThree);

// count zero values, expecting 1:
console.log(countZeroValues(multiplyByTwo));

for (let i = 0; i < 10; i++) {
  const button = document.createElement("button");
  button.textContent = `Multiply by ${i}`;
  document.body.appendChild(button);

  // Use a closure to capture the current value of `i`
  button.onclick = (function (i) {
    return function () {
      console.log(multiplyByClosure(i));
    };
  })(i);
}

/*
Here's an explanation of the changes made:

In the countZeroValues function, the comparison value == 0 has been changed to value === 0. 
It's generally recommended to use strict equality (===) for precise comparisons.

The for loop uses let instead of var to declare the variable i. Using let creates a block scope for the variable,
preventing potential issues with closures.

Inside the for loop, a closure is used to capture the current value of i for each iteration. 
This is done by immediately invoking a function with the current value of i as an argument and returning a 
new function that references that captured value. This ensures that each button's click event uses the correct value of i 
from its respective iteration.
With these changes, the code should now work correctly without any issues. */
