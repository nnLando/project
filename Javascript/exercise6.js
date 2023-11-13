function difference(a,b) {
    return a-b;
}

function product(a,b){
    return a*b;
}

function printDay (num) {

    let dates = {
        1: "Sunday",
        2: "Monday",
        3: "Tuesday",
        4: "Wednesday",
        5: "Thursday",
        6: "Friday",
        7: "Saturday",
    };
    return dates[num];
}

function lastElement(arr) {
    return arr[arr.length-1];
}

function numberCompare(a,b) {
    if(a === b) {
        return 'Number are equal';
    } else if(a > b) {
        return 'First is greater';
    }
    return 'Second is greater'
}

function singleLetterCount(strl, letter) {
    let finalCount = 0;
    for(let i =0; i< strl.length; i++){
        if(strl[i].toLowerCase() === letter.toLowerCase()) {
            finalCount++;
        }
    }
    return finalCount;
}

function arrayManipulator(arr, command, position, val) {
    if (command === 'remove'){
        if(position === 'end'){
            return arr.ppop();
        }
        return arr.shift();
    }
    else if(command === 'add'){
        if(position === 'end'){
            arr.push(val)
            return arr;
        }
        arr.unshit(val)
        return arr;
    }
}

function isPalindrome(str){
    return str.toLowerCase().split('').reverse().join('') === str.toLowerCase();
}

function RPS(){

    function determineComputer(num){
        if(num <= .33) return "rock";
        else if (num <= .66) return "paper";
        return "scissor";
    }

    let userChoice = prompt("Choose rock / paper or scissor").toLocaleLowerCase();
    let compurteChoice = determineComputer(Math.random());

    let answers = ["rock", "paper", "scissor"];

    if(!userChoice || answers.indexOf(userChoice) === -1){
        return "Please select a valid option";
    }

    if(userChoice === computerChoice) return "Tie!";

    if(userChoice === "rock" && computerChoice === "paper") {
        return "You lose, computer picked" + computerChoice;
    }

    if(userChoice === "paper" && compurteChoice === "scissor") {
        return "You lose, computer picked" + compurteChoice;
    }

    return "You win! Computer picked" + computerChoice;
}