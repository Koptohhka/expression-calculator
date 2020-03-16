function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(exp) {
  const PRIORITY = {
    '*': 4,
    '/': 4,
    '+': 2,
    '-': 2,
  }
  
  let toCalculate = (a, b, operation) => {
    if (operation === '+') {
      return a + b;
    } else if (operation === '-') {
      return a - b;
    } else if (operation === '*') {
      return a * b;
    } else if (operation === '/') {
      if (a === 0 || b === 0) {
        throw 'TypeError: Division by zero.';
      } else {
        return a / b;
      }
    }
  }

  let readyTosplit = exp.replace(/\s/g, '');
  let splitedArr = readyTosplit.match(/(\d+|[\+\-\*\/]|\(|\))/g);
  let numExpr = /[0-9]/;
  let multiplyExpr = /[*/+-]/;
  
  let arrOut = [];
  let arrOperations = [];
  let rightBracketCount = 0;
  let leftBracketCount = 0;

  splitedArr.forEach((it, i) => {
    if (numExpr.test(it)) {
      arrOut.push(it);
    } else {
      if (it === '(') {
        leftBracketCount++;
      } 
      if (arrOperations.length === 0 || arrOperations[arrOperations.length - 1] === '(' || it === '(') {
        arrOperations.push(it);
      } else if (PRIORITY[it] > PRIORITY[arrOperations[arrOperations.length - 1]]) {
        arrOperations.push(it);
      } else if (PRIORITY[it] === PRIORITY[arrOperations[arrOperations.length - 1]] || PRIORITY[it] < PRIORITY[arrOperations[arrOperations.length - 1]]) {
        for (let j = arrOperations.length - 1; j >= 0; j--) {
          
          if (PRIORITY[arrOperations[j]] === PRIORITY[it] || PRIORITY[arrOperations[j]] > PRIORITY[it]) {
            let popedItem = arrOperations.pop();
          arrOut.push(popedItem);
          } else {
            break;
          }
        }
        arrOperations.push(it);
      }

      if (it === ')') {
        rightBracketCount++;
        for (let i = arrOperations.length - 1; i >= 0; i--) {
          if (arrOperations[i] !== '(') {
            let poppedIt = arrOperations.pop();
            arrOut.push(poppedIt);
          } else {
            arrOperations.pop();
            break;
          }
        }
      }

    }
    if (i === splitedArr.length - 1) {
      for (let j = arrOperations.length - 1; j >= 0; j--) {
        arrOut.push(arrOperations[j]);
      }
    }
  });
  if (leftBracketCount !== rightBracketCount) {
    throw "ExpressionError: Brackets must be paired";
  }
  
  let calculate = (arr) => {
    let stack1 = [];
    arr.forEach((it) => {
      if (numExpr.test(it)) {
        stack1.push(it);
      } else {
          let startValue = toCalculate(Number(stack1[stack1.length - 2]), Number(stack1[stack1.length - 1]), it);
          stack1.pop();
          stack1.pop();
          stack1.push(startValue);
      }
    })
    return stack1[0];
  }
  return calculate(arrOut);
}

module.exports = {
    expressionCalculator
}