$(function(){
    var $body = $('body')
    var gameOn = true
//    var $selects = $("#selects")
    var $qNa = $("#qNa")
    var difficulty = '';
    var category = '';
    var type = '';
    var score = 0;
    var total = 10;
    var count = 0;
    var selectionsCount = []
    
    var apis_categories = {url: "https://opentdb.com/api.php?amount=10",
                geography: 22,
                vehicles: 28, 
                computers: 18,
                music: 12
               }
        
    function resetGame(){
        selectionsCount = []
        clearQuestion()
        var $selects = $("<div>")
        $selects.attr("id", "selects")
        $body.append($selects)
        var $category = $("<ul>");
        $category.text("Select category")
            var $geography = $("<li>")
            $geography.text("geography")
            $category.append($geography)    
            
            var $vehicles = $('<li>')
            $vehicles.text('vehicles')
            $category.append($vehicles)    
            var $gadgets = $('<li>')
            $gadgets.text('computers')
            $category.append($gadgets)    
            var $music = $('<li>')
            $music.text('music')
            $category.append($music)
        
        
        var $type = $("<ul>");
        $type.text("Select type")
            var $multipleChoice = $("<li>")
            $multipleChoice.text("multiple choice")
            var $trueFalse = $("<li>")
            $trueFalse.text("true / false")
            $type.append($multipleChoice).append($trueFalse)
        var $difficulty = $("<ul>");
        $difficulty.text("Select difficulty")
            var $easy = $("<li>")
            $easy.text("easy")
            var $medium = $("<li>")
            $medium.text("medium")
            var $hard = $("<li>")
            $hard.text("hard")
            $difficulty.append($easy).append($medium).append($hard)
        
        var $start = $("<button>")
        $start.attr('id', 'start')
        $start.attr("disabled", "true")
        $start.text("Start Game")
        $selects.append($category).append($type).append($difficulty).append($start)
    }

    function inputListener(){
        $("ul:nth-child(3) li").on("click", function(){
            $("ul:nth-child(3)").children().removeClass("clicked")
            $(this).addClass("clicked")
            difficulty = $(this).text()
            selectionsCount.push(1)
            checkIfSelectionsCompleted()
        })
        $("ul:nth-child(2) li").on("click", function(){
                selectionsCount.push(2)
                checkIfSelectionsCompleted()
                $("ul:nth-child(2)").children().removeClass("clicked")
                $(this).addClass("clicked")

                if($(this).text() === "multiple choice"){
                    type = "multiple"
                }
                if($(this).text() === "true / false"){
                    type = "boolean"
                }
        })
        $("ul:nth-child(1) li").on("click", function(){
            $("ul:nth-child(1)").children().removeClass("clicked")
            $(this).addClass("clicked")
            category = apis_categories[$(this).text()]
            selectionsCount.push(3)
            checkIfSelectionsCompleted()
        })
    }
    
    function checkIfSelectionsCompleted(){
        console.log(selectionsCount)
        if(selectionsCount.includes(1) && selectionsCount.includes(2) &&selectionsCount.includes(3)){
            console.log("werwer")
            $('#start').removeAttr('disabled')
        }
    }
    
    function urlConstructor(){
        return apis_categories.url + "&category=" + category + "&difficulty=" + difficulty + "&type=" + type
    }

    function startButtonListener(){
        $('#start').on('click', function(){
            $.get(urlConstructor()).then(function(resp){
                var results = resp.results
                console.log(results)
                hideSelections()
                gameStart(results);
            })
        })
    }
    
   function hideSelections(){
       $("#selects").remove()
   }
    
    function displayQuestionAndAnswersReturnCorrect(obj){
        if(!obj){
            clearQuestion()
            gameOver()
            return}
        
        clearQuestion()
        displayScore()
        var $question = $("<div>")
        $question.attr("id", "question")
        $question.text(obj.question)
        var $answer = $("<div>")
        $answer.attr("id", "answers")
        var $correctAnswer = $('<div>')
        $correctAnswer.attr("class", "answer")
        $correctAnswer.text(obj.correct_answer)
        
        for(var j = 0; j < obj.incorrect_answers.length; j++){
            var $incorrect = $("<div>");
            
            $incorrect.text(obj.incorrect_answers[j])
            $incorrect.attr("class", "answer")
            $answer.append($incorrect)
        }
        $answer.append($correctAnswer)
        $qNa.append($question).append($answer)
        return $correctAnswer.text()
    }
    
    function clearQuestion(){
        $('#qNa').empty()
    }
    
    function gameStart(arr){
        var i = 0;
        function listenToAnswer(){
            correctAnswer = displayQuestionAndAnswersReturnCorrect(arr[i])
            $("#answers div").on('click', function(){
                if(correctAnswer === $(this).text()){
                    score += 1;
                    i += 1;
                    listenToAnswer()
               } else {
                   i += 1;
                   listenToAnswer()
               } 
            })
        }
        listenToAnswer()
    }
    
    function displayScore(){
        var $currentScore = $("<div>");
        $currentScore.attr("id", "currentScore")
        $currentScore.text(++count + "/" + total)
        $qNa.append($currentScore)
    }

    
    
    function gameOver(){
        clearQuestion()
        showFinalScore()
        showHomeButton()
    }
    
    function showFinalScore(){
        var $finalScore = $("<div>");
        $finalScore.text("Total score: " + score + "/" + total)
        $finalScore.attr("id", "finalScore")
        $qNa.append($finalScore)
    }
    
    function showHomeButton(){
        $homeButton = $("<button>");
        $homeButton.text("Once more")
        $homeButton.attr("id", "home")
        $qNa.append($homeButton)
        $homeButton.on('click', function(){
            resetGame()
            inputListener()
            startButtonListener()
        })
    }
    
    resetGame()
    inputListener()
    startButtonListener()
    
    
})