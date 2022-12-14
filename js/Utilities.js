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
    }
    else{
        document.querySelector('#displayText').innerHTML='Player 2 Wins!'
        document.querySelector('#displayText').style.display='flex'
    }
}
let timer = 60
let timerId
function decreaseTimer(){
    if (timer>0) {

        timerId = setTimeout(decreaseTimer,1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    else{
        determineWinner({player,enemy,timerId})
    }
}