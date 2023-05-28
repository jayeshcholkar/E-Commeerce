let number = parseInt(prompt("Enter a number "));
let isPrime = true;
if (number === 1 || number === 0) {
  console.log("1 or 0 not a prime number");
} else {
  for (let i = 2; number > i; i++) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }
}
if (isPrime) {
  console.log(`${number} is a prime`);
} else {
  console.log(`${number} is not a prime number`);
}

// program to print prime numbers between the two numbers

// take input from the user
const lowerNumber = parseInt(prompt("Enter lower number: "));
const higherNumber = parseInt(prompt("Enter higher number: "));

console.log(
  `The prime numbers between ${lowerNumber} and ${higherNumber} are:`
);
for (let i = lowerNumber; i <= higherNumber; i++) {
  let isPrime = true;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      isPrime = false;
      break;
    }
  }
  if (i > 1 && isPrime) {
    console.log(i);
  } else {
    console.log(i);
  }
}

{
  let str = "HelloWorld";
  let arr = str.split("");

  let newArr = arr.filter((item, index) => {
    return arr.indexOf(item) == index;
  });
  console.log(newArr.join(""));
}
{
  let arr = [2, 1, 3, 4, 4, 2, 4, 1, 1];
  let newArr = [];
  for (let i = 0; arr.length > i; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      //IndexOf return -1 if element not found if already element exist it return 1
      newArr.push(arr[i]);
    }
  }
  console.log(newArr);
}

let arr = [2, 1, 3, 4, 4, 2, 4, 1, 1];

let newArr = arr.filter((item, index) => {
  return arr.indexOf(item) == index;
});
console.log(newArr);

//Reverse String and array
let str = "Jayesh";
let newStr = "";
for (let i = str.length - 1; i >= 0; i--) {
  newStr += str[i];
}
console.log(newStr);

//New new element in array not using pop and push method

let arr = [1, 2, 3];
console.log((arr[arr.length] = 6));
console.log(arr);

//concat array without method

let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
for (let i = 0; i < arr2.length; arr[arr.length] = arr2[i++]) {}
console.log(arr);

//Prime number pyramid self method

let arr = [];
let arr2 = [];
for (let p = 2; p < 12; p++) {
  p % 2 === 0 ? null : arr2.push(p);
  // if(p % 2 === 0){

  // }else {
  //     arr2.push(p)
  // }
}
for (let i = 0; i < arr2.length; arr[arr.length] = arr2[i++]) {
  console.log(arr.toString());
}

//String compressed
let str = "ssaaeeesddffee";
let newStr = "";
let strCount = 1;
for (let i = 0; i <= str.length; i++) {
  console.log(str.charAt(i), i, str.charAt(i + 1));
  if (str.charAt(i) == str.charAt(i + 1)) {
    strCount++;
  } else {
    newStr += str.charAt(i) + strCount;
    strCount = 1;
  }
}
console.log(newStr); //s2a2e3s1d2f2e2

//Retuen two array elements thats sum equals to 10

let str = [2, 4, 5, 6, 7];
let newStr = 10;

for (let i = 0; i < str.length; i++) {
  for (let j = i + 1; j < str.length; j++) {
    if (str[i] + str[j] === newStr) {
      console.log(str[i], str[j]);
    }
  }
}
