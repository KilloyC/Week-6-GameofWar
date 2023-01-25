var expect = chai.expect;

describe('MyFunction', function () { //outputs MyFunction to the console.
	describe('Should check the newDeckOfCards method assigned in the Deck class returns 52 cards', function () {
		it('it should return a new deck containing 52 cards', function () {  
            const deckOfFiftyTwo = new Deck();// creates a new deck of 52 cards for testing.
            deckOfFiftyTwo.cards
			expect(deckOfFiftyTwo.cards.length).to.equal(52); //deckOfFiftyTwo.cards.length iterates through the array to find 52 elements.
		});                                                   //if you change the equal(52) to anything else an error should pop up.
    });
})

