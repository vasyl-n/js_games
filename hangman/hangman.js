document.addEventListener("DOMContentLoaded", function(){
    var letters = 'ABCDEFGHIJKLMNOPRSTUVWXYZ';
    letters.split("")
    
    var wordsList = ['hangman', 'headphones', 'hamburger', 'tuna', 'sandwich', 'oranges', 'wolf']
    
    var banner = document.getElementById("banner")
    
    var alphabet = document.getElementById("alphabet")
    
    var result = document.getElementById('result');
    
    var lettersGuessedCount = 0
    
    for(var i = 0; i<letters.length; i++){
        var letter = document.createElement('div');
        letter.innerHTML = letters[i];
        alphabet.appendChild(letter)
    }
    
    var word = wordsList[Math.floor(Math.random() *wordsList.length)];
    var hangingStage = 5;
    var uniqueLettersCount = new Set(word).size
    console.log(uniqueLettersCount)
    for(i = 0; i<word.length; i++){
        var letterplace = document.createElement('div');
        result.appendChild(letterplace);
        letter.innerHTML = ' ';
    }

    
    alphabet.addEventListener('click', function(event){
        var letterClicked = event.target.innerHTML.toLowerCase()
        var indexesOfClickedLetter = []
        for(var i = 0; i < word.length; i++){
            if(word[i] === letterClicked){
                indexesOfClickedLetter.push(i)
            }
        }
        console.log(indexesOfClickedLetter)
        if(indexesOfClickedLetter.length === 0){
            hangingStage -= 1;
        } else {
            lettersGuessedCount += 1;
            for(var i = 0; i < indexesOfClickedLetter.length; i++){
                result.childNodes[indexesOfClickedLetter[i]].innerHTML = letterClicked.toUpperCase()
            }
        }
        
        console.log(hangingStage)
        if(hangingStage === 0){
            console.log("Looser")
            banner.innerHTML = "LOOOSER!"
            banner.style.visibility = "visible";
        }
        else if(lettersGuessedCount === uniqueLettersCount){
            console.log("congratulations")
            banner.innerHTML = "Congratulations"
            banner.style.visibility = "visible";
        }
        
        if(hangingStage === 4){
            document.getElementsByClassName("rope")[0].style.visibility = "visible"
        }
        if(hangingStage === 3){
            document.getElementsByClassName("face")[0].style.visibility = "visible"
        }
                if(hangingStage === 2){
            document.getElementsByClassName("torso")[0].style.visibility = "visible"
        }
                if(hangingStage === 1){
            document.getElementsByClassName("left-arm")[0].style.visibility = "visible"
            document.getElementsByClassName("right-arm")[0].style.visibility = "visible"
        }
                if(hangingStage === 0){
            document.getElementsByClassName("legs")[0].style.visibility = "visible"
        }
  
        
    })
    
    
})