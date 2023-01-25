//GAME OF WAR!!!

/*In this version there are only 2 players.
1. Deal 26 Cards to each Player from a Deck of 52 cards. Iterate through the turns where each Player plays a Card. 
2. The Player who played the higher card is awarded a point, Ties result in zero points for both Players.
3. After all cards have been played, display the score and declare the winner.
4. Write a Unit Test using Mocha and Chai for at least one of the functions you write.*/

/*As a part of this assignment, you will also be asked to consider:
-- Creating classes such as Card, Deck & Player
-- Keeping in mind what fields and methods each class might have.*/ 

const cardSuit = ["♠", "♣", "♥", "♦"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

class Deck {
    constructor(cards = newDeckOfCards()){ //cards is being assigned to the newDeckOfCards function, and the function is now a new identifier.
        this.cards = cards; //name of the property of the Deck object.
        
    }

shuffledDeck(){
// shuffles the cards
    for (let i = this.cards.length - 1; i > 0; i--) { //loopig through this.cards deck of cards.
        let j = Math.floor(Math.random() * (i)); 
        let oldDeck = this.cards[i];             //takes the elements in the array and chooses the next element by randomly drawing
            this.cards[i] = this.cards[j];       //an element from the array until no elements are left.
            this.cards[j] = oldDeck; 
        }
    }
}

// create a deck of cards by combining the cardSuit array and the values array then returning the combined array in the Cards class.
function newDeckOfCards(){
    return cardSuit.flatMap(suit => {
        //console.log('this is the suit', suit)
        return values.map(value => {                //mapping through each element in an array, and returns a new array from the results.
            if(ranks[value - 2] == undefined) {     //checking to see if ranks[value - 2] is equal to undefined
                if(value == 'A'){
                    //console.log('is this an Ace', ranks[12])
                    return new Card(suit, value, ranks[12])
                } else if(value == 'K'){
                    //console.log('is this an King', ranks[11])
                    return new Card(suit, value, ranks[11])         //checks the value against the string and creates a new cards for the face cards and assigns them a numeric value.
                } else if(value == 'Q'){
                    //console.log('is this an Queen', ranks[10])
                    return new Card(suit, value, ranks[10])
                } else if(value == 'J'){
                    //console.log('is this an Jack', ranks[9])
                    return new Card(suit, value, ranks[9])
                } 

            } else {
                //console.log('this is the value', ranks[value - 2], value)
                return new Card (suit, value, ranks[value - 2])             //new instance of Card.
            }
        });
    });
}

class Card {
    constructor(suit, value, rank){
        this.suit = suit;
        this.value = value;
        this.rank = rank;
    }

}

class Players {
    constructor(name){
        this.name = name;
        this.hand = []; //empty array that will store the players hand of 26 cards each.
        this.score = 0;
    }
}

const newDeck = new Deck(); //creating a new instance of Deck
newDeck.shuffledDeck(); //calling the shuffledDeck function to run.

//console.log(newDeck)
//console.log(newDeck.cards[0].value)

//playerOne and playerTwo will take in the properties of the Players class, and this will also prompt the user to enter the names for
//player one and player two.
const playerOne = new Players('Zeus')
const playerTwo = new Players('Odin') 

//divides the deck array by half and because of the newDeck it creates a new deck and calling the newDeck.shuffledDeck() function  it shuffles the
//each players hand for us. 
const deckMidpoint = newDeck.cards.length / 2;

playerOne.hand.push(newDeck.cards.slice(0, deckMidpoint));
playerTwo.hand.push(newDeck.cards.slice(deckMidpoint, newDeck.cards.length));

//console.log('player two', playerTwo.hand[0][1].value)

function startGame(){
    for(round = 0; round <= 25; round++){ //iterating through rounds 0 to 26
        //console.log('player two', playerTwo.hand[0][round].rank)
        let playerOneRank = playerOne.hand[0][round].rank
        let playerTwoRank = playerTwo.hand[0][round].rank
        let playerOneSuits = playerOne.hand[0][round].suit     //all of these are necessary because I used the map method to create a new deck, 
        let playerTwoSuits = playerTwo.hand[0][round].suit     //which returns a new array each time. so [0] accesses the array and [round] accesses the card being played
        let playerOneValues = playerOne.hand[0][round].value   //that round. Followed by the rank, suit, or value.
        let playerTwoValues = playerTwo.hand[0][round].value

        console.log(`Round: ${round + 1}` + '\n==========');
        if(playerOneRank > playerTwoRank){ //comparing the rank of the cards in each players hand
            playerOne.score += 2;             //adding an increment of two to the players score if the if-condition is true.
            console.log(`${playerOne.name} played the ${playerOneValues} of ${playerOneSuits} & ${playerTwo.name} played the ${playerTwoValues} of ${playerTwoSuits}`);
            console.log(`${playerOne.name} wins round ${round + 1} with the ${playerOneValues} of ${playerOneSuits}`);
            console.log(`${playerOne.name} has a score of:`, playerOne.score + "\n============================================")
        }
        else if(playerTwoRank > playerOneRank){
            playerTwo.score += 2;
            console.log(`${playerTwo.name} played the ${playerTwoValues} of ${playerTwoSuits} & ${playerOne.name} played the ${playerOneValues} of ${playerOneSuits}`)
            console.log(`${playerTwo.name} wins round ${round + 1} with the ${playerTwoValues} of ${playerTwoSuits}`);
            console.log(`${playerTwo.name} has a score of:`, playerTwo.score + "\n============================================")
        }
        else {
            console.log(`This round ended in a tie: ${playerOne.name} played the ${playerOneValues} of ${playerOneSuits} and ${playerTwo.name} played the ${playerTwoValues} of ${playerTwoSuits}`);
            console.log('No points are awarded for a tie!' + "\n=========================================================================")
        }
    }
}

startGame() //calling the function to run.

function endGame(playerOneScore, playerTwoScore){
    console.log('============================================\n' + `🏁Game Over🏁` + '\n============================================');
    if(playerOneScore > playerTwoScore){
        console.log(`🏆${playerOne.name} Wins with a score of ${playerOneScore} to ${playerTwoScore}🏆`);
    }
    else if(playerTwoScore > playerOneScore){
        console.log(`🏆${playerTwo.name} Wins with a score of ${playerTwoScore} to ${playerOneScore}🏆`);
    }
    else if(playerOneScore === playerTwoScore){
        console.log(`${playerOne.name} has a score of ${playerOneScore} & ${playerTwo.name} also has a score of ${playerTwoScore}`);
        console.log('The game cannot end in a tie, refresh and play again!!!');
    }
    else { 
        console.log(`One of you should have won: something went wrong! 😒`);
    }
}

endGame(playerOne.score, playerTwo.score)