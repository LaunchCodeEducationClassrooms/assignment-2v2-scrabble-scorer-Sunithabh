// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(word) {
  console.log("Let's play some scrabble! ");
  return input.question("Enter a word to score: ");
};

let simpleScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (i=0; i<word.length; i++) {
     letterPoints++;
  }
  return letterPoints;
};
 
let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let vowelBonusPoints = 0;
  let vowels = ["A","E","I","O","U"];
  for (i=0; i<word.length; i++) {
    if (vowels.includes(word[i])) {
      vowelBonusPoints += 3;
    } else {
    vowelBonusPoints += 1;
    }
  }
  return vowelBonusPoints;
};


let scrabbleScore = function(word){
  word = word.toLowerCase();
  let scrabblePoints = 0;
  for (i=0; i<word.length; i++) {
    scrabblePoints += newPointStructure[word[i]];
  }
  return scrabblePoints;
};

const scoringAlgorithms = [{name: "Simple Score",
                            desription: "Each letter is worth 1 point.",
                            scoringFunction: simpleScore
                            },
                            {name: "Bonus Vowels",
                             desription: "Vowels are 3 pts, consonants are 1 pt.",
                             scoringFunction: vowelBonusScore
                            },
                            {name: "Scrabble",
                             desription: "The traditional scoring algorithm.",
                             scoringFunction: scrabbleScore
                            }];


function scorerPrompt(word) {
  let algorithmType = input.question(`Which scoring algorithm would you like to use?\n \n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].desription}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].desription}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].desription}\nEnter 0, 1, or 2: `);
  
    if (algorithmType == 0) {
    return scoringAlgorithms[0].scoringFunction(word);
      console.log(`score for '${scoringAlgorithms[0].name}': ${scoringAlgorithms[0].scoringFunction(word)}`)
    } else if (algorithmType == 1) {
    return scoringAlgorithms[1].scoringFunction(word);
      console.log(`score for '${scoringAlgorithms[1].name}': ${scoringAlgorithms[1].scoringFunction(word)}`)
    } else  if (algorithmType == 2) {
    return scoringAlgorithms[2].scoringFunction(word);
      console.log(`score for '${scoringAlgorithms[2].name}': ${scoringAlgorithms[2].scoringFunction(word)}`)
    } else {
      console.log(`please enter a valid number`);
    }
  
};

function transform(object) { 
  let newPointObject = {};
  for (item in object) {
    for (i = 0; i < object[item].length; i++) {
      let key = object[item][i];
      key = key.toLowerCase();
      newPointObject[`${key}`] = Number(item);
    }          
  } 
  return newPointObject; 
};

let newPointStructure = transform(oldPointStructure);
   

function runProgram() {
let word = initialPrompt();
console.log(scorerPrompt(word));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

