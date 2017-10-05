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
        score = 0
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
        if(selectionsCount.includes(1) && selectionsCount.includes(2) &&selectionsCount.includes(3)){
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
                if(results.length !== 0){
                    hideSelections()
                    gameStart(results)
                } else{
                    difficulty = "easy"
                    $.get(urlConstructor()).then(function(resp){
                        results = resp.results
                        if(results.length !== 0){
                            hideSelections()
                            gameStart(results)
                        }else{
                            type = "multiple"
                            $.get(urlConstructor()).then(function(resp){
                            results = resp.results
                            hideSelections()
                            gameStart(results)
                        })
                        }                                 
                    })
                }
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
        console.log(obj.question, replace39s(obj.question))
        $question.text(replace39s(obj.question))
        var $answer = $("<div>")
        $answer.attr("id", "answers")
        var $correctAnswer = $('<div>')
        $correctAnswer.attr("class", "answer")
        $correctAnswer.text(replace39s(obj.correct_answer))
        var arr = [];
        for(var j = 0; j < obj.incorrect_answers.length; j++){
            var $incorrect = $("<div>");
            $incorrect.text(replace39s(obj.incorrect_answers[j]))
            $incorrect.attr("class", "answer")
            arr.push($incorrect)
        }
        arr.push($correctAnswer);
        shuffleArray(arr).forEach(function(x){
            $answer.append(x)
        })
        console.log(arr)
        $qNa.append($question).append($answer)
        return $correctAnswer.text()
    }
    
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function clearQuestion(){
        $('#qNa').empty()
    }
    
    function gameStart(arr){
        var i = 0;
        function listenToAnswer(){
            correctAnswer = displayQuestionAndAnswersReturnCorrect(arr[i])
            $("#answers div").on('click', function(){
                if(replace39s(correctAnswer) === replace39s($(this).text())){
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
    
    function replace39s(str){
        a = str.replace("&#039;", "'");
        a = a.replace("&quot;", "'");
        if(str === a){
           return a
           } else {return  replace39s(a)
            }
    }
    
    resetGame()
    inputListener()
    startButtonListener()
    
    
})