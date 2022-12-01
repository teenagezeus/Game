//Creating our world
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7

//Done with creating our world
//Making our characters

class sprite{
    constructor({position, velocity, color,offset}){
            this.position = position
            this.velocity = velocity  
            this.height = 150
            this.width = 50
            this.lastKey
            this.attackbox = {
                width:100 ,
                position :{
                    x:this.position.x,
                    y:this.position.y

                },
                height:50,
                offset
            }
            this.color =color
            this.isAttacking
            this.health = 100 
    }

    draw(){
        //coloring characters
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        //coloring their weapons
        if(this.isAttacking){

            c.fillStyle = 'green'
            c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
        }
    }
        //how the characters will move
    update(){
        this.draw()
        this.attackbox.position.x=this.position.x - this.attackbox.offset.x
        this.attackbox.position.y=this.position.y

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        if(this.position.y+this.height+ this.velocity.y>=canvas.height){
            this.velocity.y =0
        }else this.velocity.y+=gravity
    }

    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking=false
        }, 100)
    }
}

    //creating player
const player = new sprite({
    position:{
        x : 0,
        y : 0
    },
    velocity:{      
        x : 0,
        y : 0
    },
    offset:{
        x:0,
        y:0
    },
    color:'red'
})

    //creating enemy
const enemy = new sprite({
    position:{
        x : 400,
        y : 100
    },
    velocity:{      
        x : 0,
        y : 0
    },
    offset:{
        x:50,
        y:0
    },
    color: 'blue'
})


//Done making our characters.
//Creating movement

    //pressable keys
const keys={
    a:{
        pressed: false  
    },
    d:{
        pressed: false  
    },
    w:{
        pressed: false  
    },
    ArrowRight:{
        pressed: false  
    },
    ArrowLeft:{
        pressed: false  
    },
    ArrowUp:{
        pressed: false  
    },
    ArrowDown:{
        pressed: false  
    }
}

function rectangularCollision({rectangle1,rectangle2}){
    return(
        ((rectangle1.attackbox.position.x  >=rectangle2.position.x
            &&rectangle1.attackbox.position.x  <=rectangle2.position.x+rectangle2.width)
            ||(rectangle1.attackbox.position.x + rectangle1.attackbox.width>=rectangle2.position.x
            &&rectangle1.attackbox.position.x + rectangle1.attackbox.width<=rectangle2.position.x+rectangle2.width))
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
let timer = 15
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



decreaseTimer()

    //character moving seperately from background
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    console.log('go')
    player.update()
    enemy.update()
    player.velocity.x=0
    enemy.velocity.x=0

    //which keys do what
    if(timer>0){
    if(keys.a.pressed && player.lastKey==='a'){
        player.velocity.x=-5
    }
    else if(keys.d.pressed&&player.lastKey==='d'){
        player.velocity.x=5
    }
    else if(keys.a.pressed&&player.lastKey==='d'){
        player.velocity.x=-5
    }
    else if(keys.d.pressed&&player.lastKey==='a'){
        player.velocity.x=5
    }

    if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x=-5
    }
    else if(keys.ArrowRight.pressed&&enemy.lastKey==='ArrowRight'){
        enemy.velocity.x=5
    }
    else if(keys.ArrowLeft.pressed&&enemy.lastKey==='dArrowRight'){
        enemy.velocity.x=-5
    }
    else if(keys.ArrowRight.pressed&&enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x=5
    }

    //detect for collison
    if(rectangularCollision({
        rectangle1:player,
        rectangle2: enemy
    })
        &&player.isAttacking){

        player.isAttacking=false
        enemy.health-=5
        document.querySelector('#enemyHealth').style.width=enemy.health+'%'
        
    }
    if(rectangularCollision({
        rectangle1:enemy,
        rectangle2: player
    })
        &&enemy.isAttacking){

        enemy.isAttacking=false
        player.health-=5
        document.querySelector('#playerHealth').style.width=player.health+'%'
        
    }
    if(player.health<=0||enemy.health<=0){
        determineWinner({player, enemy,timerId})
    }
}
}

animate()

    //whick keys do what
window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y =-20
            break
        case ' ':
            player.attack()
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y =-20
            break
        case 'g':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            player.height=150
            break
    
    }

})
//Done with movement