function rectangularCollision({rectangle1,rectangle2}){
    return(
        (rectangle1.attackbox.position.x-65<=rectangle2.position.x
            &&rectangle1.attackbox.position.x+rectangle1.attackbox.width>=rectangle2.position.x)
            &&(rectangle1.attackbox.position.y+rectangle1.attackbox.height>=rectangle2.position.y
            &&rectangle1.attackbox.position.y+rectangle1.attackbox.height<=rectangle2.position.y+rectangle2.height)
    )
}
function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    timer=0
    if(player.health===enemy.health){
        document.querySelector('#displayText').innerHTML='Tie'
        document.querySelector('#displayText').style.display='flex'
    }
    else if(player.health>enemy.health){
        document.querySelector('#displayText').innerHTML='Player 1 Wins!'
        document.querySelector('#displayText').style.display='flex'
        document.querySelector('#speechbubble3').innerHTML='You have fought well. Rest now, Mr Choshi would be proud. I will be sure to tell him of your courage and true heart as he marks Eduv4831702s assignment'
        document.querySelector('#speechbubble3').style.display='flex'
        document.querySelector('#speechbubble3').style.top = '150px'
        document.querySelector('#speechbubble3').style.left=rectangle2.attackbox.position.x.toString()+'px';
        
    }
    else{
        document.querySelector('#displayText').innerHTML='Player 2 Wins!'
        document.querySelector('#displayText').style.display='flex'
        document.querySelector('#speechbubble3').innerHTML='You have fought well. Rest now, Mr Choshi would be proud. I will be sure to tell him of your courage and true heart as he marks Eduv4831702s assignment'
        document.querySelector('#speechbubble3').style.display='flex'
        document.querySelector('#speechbubble3').style.top = '150px'
        document.querySelector('#speechbubble3').style.left=rectangle2.attackbox.position.x.toString() +'px';
        
    }
}
let timer = 60
let timerId
function decreaseTimer(){
    if (timer>0) {

        document.querySelector('#displayText').innerHTML='Fight!'
        document.querySelector('#displayText').style.display='flex'

        if(timer<57)
        {
            document.querySelector('#displayText').innerHTML=''
            document.querySelector('#displayText').style.display='flex'
        }

        timerId = setTimeout(decreaseTimer,1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    else{
        determineWinner({player,enemy,timerId})
    }
}

let secondaryTimer = 20
let secondaryTimerId
function decreaseSecondaryTimer(){
    if (secondaryTimer>0) {

        
        document.querySelector('#speechbubble2').style.display='none'
        document.querySelector('#speechbubble3').style.display='none'
        document.querySelector('#speechbubble').innerHTML='If I win Mr Choshi must give Eduv4831702 10% for his ITCPA assignment!'
        document.querySelector('#speechbubble').style.display='flex'

        if(secondaryTimer<10&&secondaryTimer>0)
        {
            document.querySelector('#speechbubble').innerHTML=''
            document.querySelector('#speechbubble').style.display='none'
            
            
            document.querySelector('#speechbubble2').innerHTML='If I win, the ever so kind, ever so gracious, Mr Choshi will mark his assignment with no penalisation!'
            document.querySelector('#speechbubble2').style.display='flex'
        }
        
        

        secondaryTimerId = setTimeout(decreaseSecondaryTimer,1000)
        secondaryTimer--
    }
    else{
        
        
        secondaryTimer = 0;    
        document.querySelector('#speechbubble2').innerHTML=''
        document.querySelector('#speechbubble2').style.display='none'
        
        decreaseTimer()
  
    }
    
}