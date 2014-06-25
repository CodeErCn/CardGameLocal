var confirmRule, guess, guessTemp, answerVal, answerColor, currentCard, nextCard, numb, loop = true,loopRight = true, loopWrongCount = 3/*, count, scoreString = ""*/;

function Deck() {
    this.cards = [];
    this.deckCount = function() {
        return this.cards.length;
    }
    this.init = function() {
        //start loop of suits (s)
        for(s=1; s<=4; s++){
            //start loop of value (v)
            for(v=1; v<=13; v++){
                this.cards.push(new Card(v,s));
            }
        }
    }
}

function Card(val, suit) {
    //Assign card value and swap the 10, 11, 12, 13 to J, Q, K, A
    if(val == 10) {
        this.val = val;
        this.valDisplay = "J";
    }else if(val == 11) {
        this.val = val;
        this.valDisplay = "Q";
    }else if(val == 12) {
        this.val = val;
        this.valDisplay = "K";
    }else if (val == 13) {
        this.val = val;
        this.valDisplay = "A";
    }else {
        this.val = val;
        this.valDisplay = val + 1;
    }

    //Assign card suit weight (Not needed for this assignment)
    //this.suitWeight = suit;
    
    //Assign card symbol & card color according to suit weight
    if(suit == 1) {
        this.suitSymbol = "Daimond";
        this.suitColor = "RED";
    }else if(suit == 2) {
        this.suitSymbol = "Club";
        this.suitColor = "BLACK";
    }else if(suit == 3) {
        this.suitSymbol = "Heart";
        this.suitColor = "RED";
    }else if(suit == 4) {
        this.suitSymbol = "Spade";
        this.suitColor = "BLACK";
    }
}

//game Object of methods on confirm game rules, pull random card, prompt for guesses, card remain
var Game = {
    //1) Confirm game rules
    ConfirmMessage: function() {
        $("#gameInstruction").append("<p>Card Guessing Game instruction:</p><p>Guess if next card is either Red/Black or<br>Bigger/Lesser/Equal compare to the current card.</br><br>Ace been the biggest.</br></p><p>Winning condition:<br>1) Correct guesses OR</ba><br>2) Correct on full deck of cards.</br></p><p>You have THREE chances to get it right!!<br>Good Luck!!</br></p>");
        confirmRule = confirm("OK to procee or Cancel to exit");
    },
    //2) generate a random number rang between the count *then pull a cards off the array and remove the card and move rest of cards arry forward.
    getRandomCard: function(numberOfCards) {
        numb = Math.floor(Math.random() * numberOfCards);
        return newDeck.cards.splice(numb,1)[0];
    },
    //3) compare current card with next card
    compareCard: function(cardCurrentA, cardNextA) {
        if(cardCurrentA.val > cardNextA.val) {
            return "lesser";
        }else if(cardCurrentA.val < cardNextA.val) {
            return "bigger";
        }else if(cardCurrentA.val === cardNextA.val) {
            return "equal";
        }
    },
    //4) Prompt for player guess input - dissplay current card + card left 
    playerGuess: function(cardCurrentG) {
        while(loop == true){
            guessTemp = prompt("Card left in the deck: " + newDeck.deckCount() + "\n\nCurrent Card:   " + cardCurrentG.suitColor + "  " + cardCurrentG.suitSymbol + "  " + cardCurrentG.valDisplay + "\n\nPlease guess if next card is either Red/Black or Bigger/Lesser/Equal compare to current Card:");
                
            //check for no input (guessTemp = "null")
            if(guessTemp != null){
                //Conver answer to lower case
                guessTemp = guessTemp.toLowerCase();
                // check input for string && Red||Black||Bigger||Lessr
                if(typeof guessTemp === "string" && guessTemp === "red" || guessTemp === "black" || guessTemp === "bigger" || guessTemp === "lesser" || guessTemp ==="equal") {
                    return guessTemp;
                    break;
                }else{
                    //check input
                    alert("Please input Red/Black/Bigger/Lessr/Equal Only. Thank you.");
                    loop = true;    
                }
            }else{
                //check cancel (guessTemp = null)
                $("#gameInstruction").append("<br>GAME CANCELED</br><span>Thank you for playing!!</span>");
                break;
            }
        } // LOOP
    }
};

//Creat new Deck()
newDeck = new Deck();
newDeck.init();

/*Game starts here -- Guessing card game instruction:
Begin with a random card draw from the Deck() and ask 
for player input to guess if next card is either 
Red/Block or Bigger/Lesser/equal than current card.
Winning condition 1) if the answer is correct or
2) complete all Deck of cards. Loses if answer is wong.*/

//confirm rules
Game.ConfirmMessage();
//if confirm = true Starts the game
if(confirmRule == true){
    //pull random current card and remove from array, newDeck.count --
    currentCard = Game.getRandomCard(newDeck.deckCount());
    //loop till finish all cards or wrong
    while(loopRight == true){
        //ask for player guess (bigger/lesser/red/black) 
        guess = Game.playerGuess(currentCard);
        //pull a random next card and remove from array, newDeck.count --
        nextCard = Game.getRandomCard(newDeck.deckCount());
        //Conver color to lower case
        answerColor = nextCard.suitColor.toLowerCase();
        //Compare CurrentCard to NextCard and return string "bigger" or "lesser"
        answerVal = Game.compareCard(currentCard, nextCard);
        while(loopWrongCount != 0) {
            //break out the loop when player input cancel.
            if(typeof guess == "undefined"){
                loopRight = false;
                break;
            }else{
                //if(answer == guess) alert("you are right!!") and loop
                if(answerVal === guess || answerColor === guess){
                    alert("You are right!!\n\nAnd you still have " + loopWrongCount + " chances");                    //if newDeck.count not = 0
                    if(newDeck.deckCount() != 0) {
                        currentCard = nextCard;
                        break;
                    }
                     //if all correct on FULL DECK then break
                    else{
                        $("#gameInstruction").append("<br>Congradulation for complete the FULL deck!!</br><span>You Win!!</span>");
                        //break out the LoopRight
                        loopRight = false;
                        break;
                    }       
                }
                // allow three chances for player to be wrong
                else{
                    alert("Sorry you are Wrong!!\n\nYou have " + (loopWrongCount -1) + " chances left to try!\n\n");
                    //Wong count --
                    loopWrongCount--;
                    //else alert("Sorry you are wrong!") break out the loop
                    if(loopWrongCount == 0) { 
                        $("#gameInstruction").append("<br>GAME OVER</br><span>Next card was: </span>", nextCard.suitColor, "<span>  </span>", nextCard.suitSymbol, "<span>  </span>", nextCard.valDisplay, "<br>Thank you for playing</br>"); 
                        //break out of loopRIght
                        loopRight = false;
                        break;
                    }else{
                        // Ask user again for the answer
                        guess = Game.playerGuess(currentCard);
                    }
                }
            }
        }// 3 chance LOOP for Wong answer
    }// LOOP for right answer
}
//else "Goodbye!"   
else {
    $("#gameInstruction").append("<br>Thank you for trying.</br><span>Goodbye.<span>");
}