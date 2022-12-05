class sprite{
    constructor({position,imageSrc,scale=1,framesMax=1,offset={x:0,y:0}}){
            this.position = position
            this.height = 150
            this.width = 50
            this.image=new Image()
            this.image.src=imageSrc
            this.scale = scale
            this.framesMax=framesMax
            this.framesCurrent = 0
            this.framesCurrentFlip = this.framesMax
            this.framesElapsed = 0
            this.framesHold = 10
            this.offset=offset
    }

    draw(){
        c.drawImage(this.image,
                    this.framesCurrent*(this.image.width/this.framesMax),
                    0,
                    this.image.width/this.framesMax,
                    this.image.height,
                    this.position.x-this.offset.x,
                    this.position.y-this.offset.y,
                    (this.image.width/this.framesMax)*this.scale,
                    this.image.height*this.scale)
    }

    animateFrames(){

        this.framesElapsed++
        if(this.framesElapsed%this.framesHold===0){
            if(this.framesCurrent<this.framesMax-1){
                this.framesCurrent++
            }
            else{
                this.framesCurrent=0
            }
        }
    }
    update(){
        this.draw()         
        this.animateFrames()
    }
    fdraw(){
        c.drawImage(this.image,
                    this.framesCurrentFlip-1*(this.image.width/this.framesMax),
                    0,
                    this.image.width/this.framesMax,
                    this.image.height,
                    this.position.x-this.offset.x,
                    this.position.y-this.offset.y,
                    (this.image.width/this.framesMax)*this.scale,
                    this.image.height*this.scale)
    }

    fanimateFrames(){

        this.framesHold=10
        this.framesElapsed++
        if(this.framesElapsed%this.framesHold===0){
            if(this.framesCurrent<this.framesMax-1){
                this.framesCurrent++
                this.framesCurrentFlip--
            }
            else{
                this.framesCurrent=0
                this.framesCurrentFlip=this.framesMax
            }
        }
    }
    

    
}

class Fighter extends sprite{
    constructor({position, velocity, color,imageSrc,scale=1,framesMax=1,offset={x:0,y:0},sprites,attackBox={offset:{},width:undefined, height:undefined}}){
            super({position,
                    imageSrc,
                   scale,
                   framesMax,
                   offset
                })
            this.velocity = velocity  
            this.height = 150
            this.width = 50
            this.lastKey
            this.attackbox = {
                width:attackBox.width ,
                position :{
                    x:this.position.x,
                    y:this.position.y

                },
                height:attackBox.height,
                offset:attackBox.offset
            }
            this.color =color
            this.isAttacking
            this.health = 100 
            this.framesCurrent = 0
            this.framesCurrentFlip = this.framesMax
            this.framesElapsed = 0
            this.framesHold = 5
            this.sprites = sprites
            this.dead = false

            for(const sprite in this.sprites){
                sprites[sprite].image=new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }
    }

    
        //how the characters will move
    update(){
        this.draw()
        if(!this.dead)this.animateFrames()
        this.attackbox.position.x=this.position.x + this.attackbox.offset.x
        this.attackbox.position.y=this.position.y + this.attackbox.offset.y

        //c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width,this.attackbox.height)

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        if(this.position.y+this.height+ this.velocity.y>=canvas.height-96){
            this.velocity.y =0
            this.position.y=330
        }else this.velocity.y+=gravity
    }
    
    
    fupdate(){
        this.fdraw()         
        if(!this.dead)this.fanimateFrames()
        this.attackbox.position.x=this.position.x+this.width + this.attackbox.offset.x
        this.attackbox.position.y=this.position.y + this.attackbox.offset.y

        c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width,this.attackbox.height)

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        if(this.position.y+this.height+ this.velocity.y>=canvas.height-96){
            this.velocity.y =0
            this.position.y=330
        }else this.velocity.y+=gravity
    }

    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true
        
    }
    fAttack(){
        this.switchSprite('attack1-flip')
        this.isAttacking = true
        
    }
    takeHit(){
        this.health-=5
        if(this.health<=0)
        {
            this.switchSprite("death")
        }
        else{
            this.switchSprite("takeHit")
        }
    }
    fTakeHit(){
        this.health-=5
        if(this.health<=0)
        {
            this.switchSprite("death-flip")
        }
        else{
            this.switchSprite("takeHit-flip")
        }
    }
    switchSprite(sprite){

        if (this.image===this.sprites.death.image){ 
            if(this.framesCurrent===this.sprites.death.framesMax-1)
                this.dead=true
            return}
        if (this.image===this.sprites.attack1.image&&this.framesCurrent<this.sprites.attack1.framesMax-1) return
        if (this.image===this.sprites.takeHit.image&&this.framesCurrent<this.sprites.takeHit.framesMax-1) return
        if (this.image===this.sprites.deathflip.image/2){ 
            if(this.framesCurrentFlip===this.framesMax)
                this.dead=true
            return}
        if (this.image===this.sprites.attack1flip.image&&this.framesCurrent<this.sprites.attack1flip.framesMax-1) return
        if (this.image===this.sprites.takeHitflip.image&&this.framesCurrent<this.sprites.takeHitflip.framesMax-1) return
        
        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.framesHold=10
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
         
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.framesHold=1
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.framesHold=10
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.framesHold=5
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'idle-flip':
                if(this.image !== this.sprites.idleflip.image){
                    this.framesHold=10
                    this.image = this.sprites.idleflip.image
                    this.framesMax = this.sprites.idleflip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
         
            case 'run-flip':
                if(this.image !== this.sprites.runflip.image){
                    this.image = this.sprites.runflip.image
                    this.framesMax = this.sprites.runflip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'jump-flip':
                if(this.image !== this.sprites.jumpflip.image){
                    this.image = this.sprites.jumpflip.image
                    this.framesMax = this.sprites.jumpflip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'fall-flip':
                if(this.image !== this.sprites.fallflip.image){
                    this.image = this.sprites.fallflip.image
                    this.framesMax = this.sprites.fallflip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'attack1-flip':
                if(this.image !== this.sprites.attack1flip.image){
                    this.framesHold=1
                    this.image = this.sprites.attack1flip.image
                    this.framesMax = this.sprites.attack1flip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'takeHit-flip':
                if(this.image !== this.sprites.takeHitflip.image){
                    this.framesHold=10
                    this.image = this.sprites.takeHitflip.image
                    this.framesMax = this.sprites.takeHitflip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
            case 'death-flip':
                if(this.image !== this.sprites.deathflip.image){
                    this.framesHold=5
                    this.image = this.sprites.deathflip.image
                    this.framesMax = this.sprites.deathflip.framesMax
                    this.framesCurrent=0
                    this.framesCurrentFlip = this.framesMax
                }
                break
        }
    }

}
