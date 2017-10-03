document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("change_heading").innerText = "Hello World!";
    
    
    
    var els =   document.querySelectorAll('section div')
    for(i = 0; i < els.length; i++){
        els[i].addEventListener("mouseover", function(event){
            document.querySelector(".selected").innerHTML = this.className
        })
    }
    
    var purple = document.createElement("div")
    purple.className = "purple"
    var section = document.getElementsByTagName("section")
    console.log(section)
    section[0].append(purple)
    
    
    var start = document.getElementsByTagName("button")[0]
    var car1 = document.querySelector('.car1');
    var car2 = document.getElementsByClassName('car2')[0]
    car1.style.marginLeft = 0;
    car2.style.marginLeft = 0;

    function reset(){
        clearInterval(timer1);
        clearInterval(timer2);
        car1.style.marginLeft = 0;
        car2.style.marginLeft = 0;
    }
        
        start.addEventListener("click", function(){    
        timer1 = setInterval(function(){
            car1.style.marginLeft = parseInt(car1.style.marginLeft) + Math.random() * 5 + 'px';
            
            if(parseInt(car1.style.marginLeft) > window.innerWidth){
                document.getElementsByTagName('h1')[0].innerText = "car 1 won the race"
                console.log('car1 win')
                reset()
            }
        }, 10)
        
        timer2 = setInterval(function(){
            car2.style.marginLeft = parseInt(car2.style.marginLeft) + Math.random() * 5 + "px"
            if(parseInt(car2.style.marginLeft) > window.innerWidth){
                console.log("car2 win")
                document.getElementsByTagName('h1')[0].innerText = "car 2 won the race"
                reset()
            }
        }, 10)
    })
    
})