2== "2"; //true 
2===2; //true
10 % 3 // 1
10 % 3 === 1; //true 
true && false; //false
false || true; //true
true || false; //true

let isLearning = true;
if (isLearning === true) {
    console.log("Keep it up");
} else { 
    console.log("Pretty sure you are learning....");
}

let isLearning = true;
if (isLearning = true) {
    console.log("Keep it up");
} else { 
    console.log("Pretty sure you are learning....");
}


let firstVariable;
let secondVariable = "";
let thirdVariable = "l";
let secretMessage = "Shh!";

if (firstVariable){
    console.log("first");
} else if(firstVariable || secondVariable) {
    console.log("second");
} else if(firstVariable || thirdVariable) {
    console.log("third");
} else {
    console.log("fourth");
}


if(Math.random() > .5) {
    console.log("Over 0.5");
} else {
    console.log("Under 0.5");
}