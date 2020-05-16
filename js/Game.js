/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {

        constructor() { 
            this.missed =0; //variable that counts the number of missed guesses
            this.phrases =  this.createPhrases(); //creates a phrase object
            this.activePhrase  = null; 
            this.lastphrase = 0; //This Variable stores the index of last pharse displaed to the UI 
            this.letter; //This variable stores the input letter
                  }
        
            createPhrases(){
                return [
            new Phrase ("May the Force be with you") ,
            new Phrase ("I am your father"),
            new Phrase ("Why so serious"),
            new Phrase ("Say hello to my little friend"),
            new Phrase ("Keep your friends close but your enemies closer"),
            new Phrase ("My precious"),
            new Phrase ("Go ahead make my day"),
            new Phrase ("They may take our lives but they will never take our freedom"),
            new Phrase ("You shall not pass"),
            new Phrase ("This day we fight")


          ]
      }
            /*The getRandomPhrase() randomly selects the a phrase from the phrase bank */

            getRandomPhrase(){

            let x = Math.floor(Math.random()*9);

            if (this.lastphrase == x ) 
                {x = Math.floor(Math.random()*7);}
                this.lastphrase = x;
            return this.phrases[x];
            
            }

            //This function truly starts the game!
            startGame(){

            $('#overlay').slideUp();
          
            let phraseObj = this.getRandomPhrase () ; //temp store for the new phrase object
            this.activePhrase = phraseObj; 
            this.activePhrase.addPhraseToDisplay(); //phrase added to display
            game.scoreBoardReset();         //Reset score Board
            this.resetKeyboard();           //Reset the on screen keyboard at the start of a new game
            return this.activePhrase;

            }

             /* The resetKeyboard Function empties the changes made to the keyboard during the game */
             resetKeyboard(){
                $('.key').attr('disabled', false); 
                 $('.key').removeClass('chosen wrong') 
        }

        
            /* The CheckForWin function compares a letter passed to it with
            the phrase displayed and returns a true or false */
            checkForWin(){
                let w = $('#phraseUL .letter');
                let v = $('.show');
                if(w.length==v.length)
                        {
                        return true } else return null;}

                       

            
                    
            /* The removeLife() function decrements the number of lives and replaces the graphic with a lost live icon */                
            removeLife(){  
                        $('.tries').first().remove();
                        let killGraphic = '<li id="lostLife"> <img src="images/lostHeart_1.png" alt="Heart Icon" height="70" width="70"></li>';
                        $("#scoreLine").append(killGraphic);
                        this.missed++;
                        this.gameLivesCounter(); 
                        this.gameOver();
                        return this.missed;
                         }

            /* The gameOver() function checks for conditions that qualify to end the game , either a win or a loss */
            gameOver() {
                //This is the happy path...a Win
                 if(this.checkForWin()==true) {
                 $("#game-over-message").text("Hurray !!! You Won ! "); //Prints Text to screen
                 $('#overlay').slideDown(); //Calls the overlay function
                 $('#overlay').attr('class','win'); //adds the win class to the overlay
                } 
                 
                 //This is loss path , Triggered when the missed score reaches 5
                 if(this.missed ==5){ 
                 $("#game-over-message").text("GAME OVER...Try Again"); //Prints Text to screen
                 $('#overlay').attr('class','lose'); // adds the loss class to the overlay
                 { $('#overlay').slideDown()  }//Calls the overlay function
                        }}

            
            // Uses the this.missed property to compute and display the number of lives left 
            gameLivesCounter(){
                                $('#gameLife').text(` ${5-game.missed} Lives Left`); 
                                }

            // This Function resets the score board evrytime a new game starts 
            scoreBoardReset() {
            $("#scoreLine").empty();//Empties the scoreboard 
            let scoreDisplay = '<li class="tries"><img src="images/liveHeart_1.png" alt="Heart Icon" height="70" width="70"></li>'; // HTML for the graphic that represents the each life on the scoreboard
            for(let i=0; i<5 ; i++) { $("#scoreLine").append(scoreDisplay) } //Loop That creates 5 instances
            $("#game-over-message").text(" "); 
            $('#overlay').attr('class','start');  // adds the start class to the overlay
            this.gameLivesCounter(); //calls the score digit counter
                        }

          
            
            /* The clickHandler manages the game logic on reciving the click event */

            clickHandler()
            {
            const keys = $('.key'); //selects the keys
            keys.click( (e) => {
                
                let tempKey =e.target;
                
                let letter = tempKey.innerText; //jumps inside the html text to read the keys 
                              
                if(this.activePhrase.checkLetter(letter)) 
                        {this.activePhrase.showMatchedLetter(letter); 
                            this.checkForWin();
                            tempKey.classList.add("chosen"); //adds the chosen class to keyboard for each correctly selected letter - key truns green
                            tempKey.disabled =true; //disables the a button on the keyboard after being clicked
                            this.gameOver(); //The game over function to check if the game has been won or the player has run out of lives 
                        }

                if(this.activePhrase.checkLetter(letter)==false)
                        {
                            this.removeLife();
                            tempKey.classList.add("wrong"); //adds the wrong class to keyboard for each wrongly selected letter - key truns red
                            tempKey.disabled =true; //disables the a button on the keyboard after being clicked
                            this.gameOver(); //The game over function to check if the game has been won or the player has run out of lives 
                        }
                            
                             } ); 
                                }

            /* The clickHandler manages the game logic on reciving a keyboard entry*/                     
            keyStrokeHandler () 
            {                     
            let keysCheck = /^[a-z]{1}$/i ;// Regular expression to exclude other none lowercase inputs 
                        
            $(document).on('keyup', (e)=> {
                    let letter=e.key.toLowerCase();
                         if(keysCheck.test(letter))
                             { 
                                 for(let i=0 ;i<26 ;i++) { if ($('.key')[i].innerText  ==letter) {$('.key')[i].click() }

                                
                                }          
                         }} )  }
                

                    

            handleInteraction(){

                $('.key').off(); //unbinds the EventListner to prevent multiple instances of the same handler being trigered ont he start of a new game
                $(document).off('keyup'); //unbinds the EventListner to prevent multiple instances of the same handler being trigered ont he start of a new game
                this.clickHandler(); 
                this.keyStrokeHandler ();

            }
     
  

           }