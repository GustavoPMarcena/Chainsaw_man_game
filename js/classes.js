class Sprite {
    constructor({position, imageSrc}){
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
  
  
    update(){
      this.draw()
    }
}
  
class Fighter {
    constructor({position, velocity, offset, imageSrc, imgs}){
      this.position = position
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastkey
      this.attackbox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset,
        width: 100,
        height: 50
      }
      
      this.isAttacking
      this.health = 100
      this.image = new Image()
      this.image.src = imageSrc
      this.images = new Image()
      this.images.src = imgs
      
    }
    
    draw() {
       
      c.drawImage(this.image, this.position.x, this.position.y)
       

      // c.fillRect(this.position.x, this.position.y, this.width, this.height)
      
      // ataque 
      if (this.isAttacking){
      player.attackbox.position.x += 50
      enemy.attackbox.position.y +=30
      enemy.attackbox.position.x -= 20
      
      c.drawImage(this.images, this.attackbox.position.x, this.attackbox.position.y +10, this.attackbox.width, this.attackbox.height - 20)
      }
    }
  
  
    update(){
      this.draw()
  
      this.attackbox.position.x = this.position.x + this.attackbox.offset.x
      this.attackbox.position.y = this.position.y
  
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      
      if (this.position.y + this.height + this.velocity.y >= canvas.height){
        this.velocity.y = 0
      } else {
        this.velocity.y += gravity
      }
  
      
    }
    attack() {
      this.isAttacking = true
      setTimeout(() => {
        this.isAttacking = false
      }, 100);
    }
}