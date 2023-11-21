//Creating our world
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7

//Done with creating our world
//Making our characters

const background= new sprite({
    imageSrc:'./img/background.png',
    position:{
        x:0,
        y:0
    }

})

const shop= new sprite({
    imageSrc:'./img/shop.png',
    position:{
        x:615,
        y:127
    },
    scale:2.75,
    framesMax:6

})

    //creating player
const player = new Fighter({
    position:{
        x : 200,
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
    imageSrc:'./img/samuraiMack/Idle.png',
    framesMax:8,
    scale:2.5,
    offset:{x:215,y:156},
    sprites:{
        idle:{
            imageSrc:'./img/samuraiMack/Idle.png',
            framesMax:8
        },
        run:{
            imageSrc:'./img/samuraiMack/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./img/samuraiMack/Jump.png',
            framesMax:2
        },
        fall:{
            imageSrc:'./img/samuraiMack/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            framesMax:6
        },
        takeHit:{
            imageSrc:'./img/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4
        },
        death:{
            imageSrc:'./img/samuraiMack/Death.png',
            framesMax:6
        },
        idleflip:{
            imageSrc:'./img/samuraiMack/fIdle.png',
            framesMax:8
        },
        runflip:{
            imageSrc:'./img/samuraiMack/fRun.png',
            framesMax:8
        },
        jumpflip:{
            imageSrc:'./img/samuraiMack/fJump.png',
            framesMax:2
        },
        fallflip:{
            imageSrc:'./img/samuraiMack/fFall.png',
            framesMax:2
        },
        attack1flip:{
            imageSrc:'./img/samuraiMack/fAttack1.png',
            framesMax:6
        },
        takeHitflip:{
            imageSrc:'./img/samuraiMack/fTake Hit - white silhouette.png',
            framesMax:4
        },
        deathflip:{
            imageSrc:'./img/samuraiMack/fDeath.png',
            framesMax:6
        }
    },
    attackBox:{
        offset: {
            x:70,
            y:50
        },
        width:180,
        height:50
    } 

})

    //creating enemy
const enemy = new Fighter({
    position:{
        x : 800,
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
    imageSrc:'./img/kenji/Idle.png',
    framesMax:8,
    scale:2.5,
    lastVelocity :0,
    offset:{x:215,y:170},
    sprites:{
        idle:{
            imageSrc:'./img/kenji/Idle.png',
            framesMax:4
        },
        run:{
            imageSrc:'./img/kenji/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./img/kenji/Jump.png',
            framesMax:2
        },
        fall:{
            imageSrc:'./img/kenji/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./img/kenji/Attack1.png',
            framesMax:4
        },
        takeHit:{
            imageSrc:'./img/kenji/take Hit.png',
            framesMax:3
        },
        death:{
            imageSrc:'./img/kenji/Death.png',
            framesMax:7
        },
        idleflip:{
            imageSrc:'./img/kenji/Idle-flip.png',
            framesMax:4
        },
        runflip:{
            imageSrc:'./img/kenji/Run-flip.png',
            framesMax:8
        },
        jumpflip:{
            imageSrc:'./img/kenji/Jump-flip.png',
            framesMax:2
        },
        fallflip:{
            imageSrc:'./img/kenji/Fall-flip.png',
            framesMax:2
        },
        attack1flip:{
            imageSrc:'./img/kenji/Attack1-flip.png',
            framesMax:4
        },
        takeHitflip:{
            imageSrc:'./img/kenji/take Hit-flip.png',
            framesMax:3
        },
        deathflip:{
            imageSrc:'./img/kenji/Death-flip.png',
            framesMax:7
        }
    },
    attackBox:{
        offset: {
            x:-170,
            y:50
        },
        width:140,
        height:50
    }
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


decreaseSecondaryTimer()

    //character moving seperately from background
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    console.log('go')
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255,255,255,0.15)'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
    player.fupdate()
    enemy.fupdate()
    
    player.velocity.x=0
    enemy.velocity.x=0

    //which keys do what
    
    
        
        if(keys.a.pressed && player.lastKey==='a'){
            player.velocity.x=-5
            player.lastVelocity = player.velocity.x
            player.switchSprite('run-flip')}
        else if(keys.d.pressed&&player.lastKey==='d'){
            player.velocity.x=5
            player.lastVelocity = player.velocity.x
            player.switchSprite('run')        }
        else if(keys.a.pressed&&player.lastKey==='d'){
            player.velocity.x=-5
            player.lastVelocity = player.velocity.x
            player.switchSprite('run-flip')        }
        else if(keys.d.pressed&&player.lastKey==='a'){
            player.velocity.x=5
            player.lastVelocity = player.velocity.x
            player.switchSprite('run')        
        } else if(player.lastVelocity===-5&&keys.a.pressed==false&&keys.d.pressed==false){
            player.switchSprite('idle-flip')
        }else{
            player.switchSprite('idle')
        }

        if(player.lastVelocity===-5&&player.velocity.y<0){
            player.switchSprite('jump-flip')
        }else if(player.velocity.y>0&&player.lastVelocity===-5){
            player.switchSprite('fall-flip')
        }else if(player.velocity.y<0){
            player.switchSprite('jump')
        }else if(player.velocity.y>0){
            player.switchSprite('fall')
        }

        if(player.velocity.x===-5){
            player.attackbox.offset.x=-240
        }else if(player.velocity.x===5) {
            player.attackbox.offset.x=30
        }

        if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
            enemy.velocity.x=-5
            enemy.lastVelocity=enemy.velocity.x
            enemy.switchSprite('run')
        }
        else if(keys.ArrowRight.pressed&&enemy.lastKey==='ArrowRight'){
            enemy.velocity.x=5
            enemy.lastVelocity=enemy.velocity.x
            enemy.switchSprite('run-flip')
        }
        else if(keys.ArrowLeft.pressed&&enemy.lastKey==='ArrowRight'){
            enemy.velocity.x=-5
            enemy.lastVelocity=enemy.velocity.x
            enemy.switchSprite('run')
        }
        else if(keys.ArrowRight.pressed&&enemy.lastKey==='ArrowLeft'){
            enemy.velocity.x=5
            enemy.lastVelocity=enemy.velocity.x
            enemy.switchSprite('run-flip')
        } else if(enemy.lastVelocity===5&&keys.ArrowLeft.pressed==false&&keys.ArrowRight.pressed==false){
            enemy.switchSprite('idle-flip')
        }else{
            enemy.switchSprite('idle')
        }

        if(enemy.lastVelocity===5&&enemy.velocity.y<0){
            enemy.switchSprite('jump-flip')
        }else if(enemy.velocity.y>0&&enemy.lastVelocity===5){
            enemy.switchSprite('fall-flip')
        }else if(enemy.velocity.y<0){
            enemy.switchSprite('jump')
        }else if(enemy.velocity.y>0){
            enemy.switchSprite('fall')
        }

        if(enemy.velocity.x===-5){
            enemy.attackbox.offset.x=-220
        }else if(enemy.velocity.x===5) {
            enemy.attackbox.offset.x=50
        }

        //detect for collison
        if(rectangularCollision({
            rectangle1:player,
            rectangle2: enemy
        })
            &&player.isAttacking&&player.framesCurrent===4&&enemy.lastVelocity===-5){
            enemy.takeHit()
            player.isAttacking=false
            gsap.to('#enemyHealth',{
                width:enemy.health+'%'
            })
        
        }else if(rectangularCollision({
            rectangle1:player,
            rectangle2: enemy
        })
            &&player.isAttacking&&player.framesCurrent===4&&enemy.lastVelocity===5){
            enemy.fTakeHit()
            player.isAttacking=false
            gsap.to('#enemyHealth',{
                width:enemy.health+'%'
            })
        
        }

        if(player.isAttacking&&player.framesCurrent===4){
            player.isAttacking=false
        }
        if(rectangularCollision({
            rectangle1:enemy,
            rectangle2: player
        })
            &&enemy.isAttacking
            &&enemy.framesCurrent===2
            &&player.lastVelocity===5){

            player.takeHit()
            enemy.isAttacking=false
            gsap.to('#playerHealth',{
                width:player.health+'%'
            })
        
        }else if(rectangularCollision({
            rectangle1:enemy,
            rectangle2: player
        })
            &&enemy.isAttacking
            &&enemy.framesCurrent===2
            &&player.lastVelocity===-5){

            player.fTakeHit()
            enemy.isAttacking=false
            gsap.to('#playerHealth',{
                width:player.health+'%'
            })
        
        }

        if(enemy.isAttacking&&(enemy.framesCurrent===2)){
            enemy.isAttacking=false
        }

        if(player.health<=0||enemy.health<=0){
            determineWinner({player, enemy,timerId})
        }
    
}

animate()

    //whick keys do what
window.addEventListener('keydown',(event)=>{
    if(!player.dead&&timer>0){
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
            if(player.lastVelocity===-5){
                player.fAttack()
            }else{
                player.attack()
            }
            break
        }
    }
        if(!enemy.dead&&timer>0){
        switch(event.key)    {
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
            if(enemy.lastVelocity===5){
                enemy.fAttack()
            }else{
                enemy.attack()
            }
            break
    }
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
//Done with movementdj
 
