$(function(){
    var $title = $('#title')
    var $rating = $('#rating')
    var $add = $('#add')
    var $table = $('table')
    var $input = $('input')
    
    
    function createRow(title, rating){
        var $newRow = $('<tr>')
        var $newTitle = $('<td>', {
            text: title
        })
        var $newRating = $('<td>', {
            text: rating
        })
        var $delete = $('<button>', {
            text: "DELETE",
            id: 'delete'
        })
        
        $newRow.append($newTitle)  
        $newRow.append($newRating)
        $newRow.append($delete)
        $table.append($newRow)
    }
    
    function inputValListener() {$input.on("click", function(){
        $(this).val("").off()
        })
    }
    
    function clearInput(){
        $title.val("");
        $rating.val("");
    }
    
    function resetFields(){
        $title.val("Movie Title");
        $rating.val("Rate the movie from 0 to 10");

    }
    
    resetFields()
    inputValListener()
    $add.on('click', function(x){
        x.preventDefault()
        var titleText = $title.val()
        var ratingText = $rating.val()
        createRow(titleText, ratingText)
        clearInput()
        resetFields()
        inputValListener()
    })
    var $delete = $('#delete')
    $table.on('click', '#delete', function(){
        $(this).parent().remove()
    })
    
})