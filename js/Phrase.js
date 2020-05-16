/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */



 /* The Phrase class has methods that add a pharse to the screen/UI & Checks to see if the correct letter has been passed 
  from the UI or Keyboard & the showMatched that updates the UI when the correct letter is entered */

 class Phrase{

        constructor(phrase){
            this.phrase=phrase.toLowerCase(); // This converts any phrase to lowercase
            }

        addPhraseToDisplay() {
            let pharseCharacters = this.phrase.split(''); //creates an Array from the phrase
            $('#phrase').html('<ul id="phraseUL"> </ul>'); //Empty the Div
                 
                for (let i=0; i<pharseCharacters.length;i++)
                        {
                            if (pharseCharacters[i]==" ") //Checks for spaces and applies a space class
                                 { 
                                    let spaceHtml = '<li class="space">  </li>';
                                    $('#phraseUL').append(spaceHtml) ; 
                                 }
                            
                             else //
                             {
                                    let letterHtml = '<li class="hide letter '+ `${pharseCharacters[i]}`+ ' "' + ' >' +' ' + `${pharseCharacters[i]}` + '</li>' ;

                                    $('#phraseUL').append(letterHtml) ;
                             }   

                        }
        }

        //checkLetter fnx  compares a passed value with the active phrase
         checkLetter(letter)
            {
            if(this.phrase.includes(letter))
                {
                   
                    return true} 
                else {return false} 
                }
        
        //The showMatchedLetter fnx takes a letter passed to it and displays it to the screen

        showMatchedLetter(letter){ 
            let w = $('#phraseUL .letter');
                for(let i=0; i < w.length ;i++) { if(w[i].innerText==letter){w[i].classList.add('show'); 
                    }  }
                    
                        }


             }



