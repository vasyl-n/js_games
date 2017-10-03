$(function(){
    var $input = $('input');
    var $search = $('#search');
    var $remove = $('#remove');
    var api_key = 'aVydYs3NvO64Lj5n4okXrV0Luwc0VwBF'
    
    function resetInput(){
        $input.val("")
    }
    
    
    function addGif(url){
        var $img = $('<img>');
        $img.attr('src', url)
        $('#gifs').append($img)
    }
    
    function getUrl(resp){
        var i = 0
        return resp["data"][0]["images"]["fixed_width_downsampled"]["url"] || resp["data"][1]["images"]["fixed_width_downsampled"]["url"] || resp["data"][2]["images"]["fixed_width_downsampled"]["url"]
    }
    
    console.log()
    $search.on('click', function(){
        var input = $input.val()
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=" + api_key + "&limit=3").then(function(response){
            var url = getUrl(response)
            addGif(url)  
        });
        resetInput()
    })
    
    $remove.on('click', function(){
        $('#gifs').empty()
    })
    
})
