var canvas = document.getElementById("game-canvas");
var c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7


const background = new Sprite ({
  position: {
    x:-200,
    y:-100
  },
  imageSrc: './img/level_img.webp'
})

const player = new Fighter ({
  position:{
    x:200,
    y:400
  },
  velocity:{
    x:0,
    y:0
  },
  offset: {
    x:0,
    y:0
  },
  imageSrc: './img/denji - Copia.png',
  imgs: './img/serra.png'
})



const enemy = new Fighter ({
  position:{
    x:700,
    y:400
  },
  velocity:{
    x:0,
    y:0
  },
  color:'blue',
  offset: {
    x: -50,
    y:0
  },
  imageSrc: './img/enemy.png',
  imgs: './img/espada.png'
  
})

const keys = {
  a:{
    pressed:false
  },
  d:{
    pressed:false
  },
  ArrowRight:{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  },
  imageSrc: './img/denji - Copia.png'
}



function rectangularCollision({rectangle1, rectangle2}){
  return(
    rectangle1.attackbox.position.x + rectangle1.attackbox.width >= 
    rectangle2.position.x && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y &&
    rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
  )
}


function determineWinner({ player, enemy, timerId}){
  clearTimeout(timerId)
  document.querySelector('#resultado').style.display = 'flex'
  if (player.health === enemy.health){
    document.querySelector('#resultado').innerHTML = 'Empate'
  } else if (player.health > enemy.health){
    document.querySelector('#resultado').innerHTML = 'Player 1 vence'
  } else if (player.health < enemy.health){
    document.querySelector('#resultado').innerHTML = 'Player 2 vence'
  }
}


let timer = 60
let timerId
function decreaseTimer(){
  if (timer > 0){
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
  if (timer == 0){
    determineWinner({player, enemy})
  } 
}

decreaseTimer()


function animate(){
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0, canvas.width, canvas.height)
  background.update()

  player.update()
  enemy.update()
  

  player.velocity.x = 0
  enemy.velocity.x = 0
  // movimento do jogador
  if (keys.a.pressed && player.lastkey ==='a'){
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastkey ==='d'){
    player.velocity.x = 5
  } 
  // movimento do inimigo
  if (keys.ArrowLeft.pressed && enemy.lastkey ==='ArrowLeft'){
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastkey ==='ArrowRight'){
    enemy.velocity.x = 5
  }
  // colisao player
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2:enemy
    }) && 
    player.isAttacking
  ){
    player.isAttacking = false
    enemy.health -=10
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }
  // colisao inimigo
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) && 
    enemy.isAttacking
  ){
    enemy.isAttacking = false
    player.health -=10
    document.querySelector('#playerHealth').style.width = player.health + '%'
  }
  
  if (enemy.health <=0 || player.health <=0){
    determineWinner({player, enemy, timerId})
  }
}

animate()


window.addEventListener('keydown', (event) => {
  switch (event.key){
    //teclas player
    case 'd':
      keys.d.pressed = true
      player.lastkey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastkey = 'a'
      break
    case 'w':
      player.velocity.y = -20
      break
    case ' ':
      player.attack()
      break
    //teclas inimigo 
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastkey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastkey = 'ArrowLeft'
      break
    case 'ArrowUp':
      enemy.velocity.y = -20
      break
    case 'ArrowDown':
      enemy.attack()
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key){
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    // teclas do inimigo
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})

