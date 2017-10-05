var clozeCard = require("./ClozeCard.js");
var basicCard = require("./BasicCard.js");
var inquirer = require('inquirer');


inquirer.prompt([{

        type: "confirm",
        message: "Are you ready to make a card?",
        name: "confirm",
        default: true
    }])
    .then(function(answer) {
        if (answer.confirm === true) {
            addCard();
        } else if (answer.command === false) {
            return "Try again later!";
        }
    });

var addCard = function() {

    inquirer.prompt([{
        name: 'cardType',
        message: 'What kind of flashcard would you like to create?',
        type: 'list',
        choices: [{
            name: 'basic-flashcard'
        }, {
            name: 'cloze-flashcard'
        }]

    }]).then(function(answer) {
        if (answer.cardType === 'basic-flashcard') {
            inquirer.prompt([{
                name: 'front',
                message: 'What is the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide an actual question!');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'back',
                message: 'What is the answer to the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide an actual answer!');
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answer) {
                whatsNext();
            });
        } else if (answer.cardType === 'cloze-flashcard') {
            inquirer.prompt([{
                name: 'text',
                message: 'What is the full text of the card?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide the full text');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'cloze',
                message: 'What is the cloze portion of the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide the cloze portion of the question');
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answer) {
                var text = answer.text;
                var cloze = answer.cloze;
                if (text.includes(cloze)) {
                    whatsNext();
                } else {
                    console.log('The cloze portion you provided is not found in the full text. Please try again.');
                    addCard();
                }
            });
        }
    });
};

var whatsNext = function() {
    inquirer.prompt([{
        name: 'nextAction',
        message: 'What would you like to do next?',
        type: 'list',
        choices: [{
                name: 'create-new-card'
            },
            {
                name: 'nothing'
            }
        ]
    }]).then(function(answer) {
        if (answer.nextAction === 'create-new-card') {
            addCard();
        } else(answer.nextAction === 'nothing')

    });
};