$(function(){
    var $addButton = $('#addButton');
    var $body = $('body').eq(0)
    var $list = $('<ol>');
    $body.append($list)
    console.log($addButton.text())
    $addButton.on("click", function(event){
        event.preventDefault()
        var $input = $('#input')
        var $item = $('<li>',{text:$input.val()})
//        console.log($input)
//        $item.text($input.val())
        $input.val("")
        
        
        var $del = $('<button>');
        $del.text('Delete');  
        
        $list.append($item)
        $item.append($del)
        
        $del.on('click', function(event){
            console.log($(this).parent().remove())
            $(this).parent().remove()
        });
   
        $list.on('click', function(event){
            $(this).css('textDecoration', "line-through")
        }) 
    });
})
//
//    var don = []
//    var de = []
//    addButton.addEventListener('click', function(){
//        var el = document.createElement("li")
//        var input = document.querySelector(".input").value
//        el.innerHTML = input
//        ol.appendChild(el)
//        document.querySelector(".input").value = ""
//        
//        var done = document.createElement("input")
//        done.setAttribute('type', 'checkbox')
//        done.setAttribute('class', 'done')
//        el.appendChild(done)
//        don.push(done)
//        for(i = 0; i < don.length; i++){
//            don[i].addEventListener('click', function(a){     
//            a.target.parentElement.style.textDecoration = "line-through"
//            })
//        }
//        
//        var del = document.createElement("button")
//        del.innerHTML = "Delete"
//        el.appendChild(del)
//        de.push(del)
//        
//        for(i = 0; i < de.length; i++){
//            de[i].addEventListener("click", function(a){
//               a.target.parentNode.parentNode.removeChild(a.target.parentNode)
//            })
//        }
//    })
//    
//    