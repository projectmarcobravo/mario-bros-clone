// Selecting  the canvas and creating the 2d mode
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const header = document.querySelector('.header')
const gif = document.querySelector('.gif')
const gameBoard = document.querySelector('.game-board')
const tryAgain = document.querySelector('.try-again')
const body = document.querySelector('body')

// Images
const floorImg = new Image()
floorImg.src = "./images/Floor-Block.png"

const backgroundImg = new Image()
backgroundImg.src = "./images/background.jpeg"

const marioImg = new Image()
marioImg.src = "./images/mario-right.png"

const marioJump = new Image()
marioJump.src = "./images/mario-jumping-right.png"

const marioLeft = new Image()
marioLeft.src ="./images/mario-left.png"

const rocket = new Image()
rocket.src = "./images/rocket.png"

const princessImg = new Image()
princessImg.src = "./images/princess.png"

const marioPeach = new Image()
marioPeach.src = "./images/mario-peach-kissing.gif"

const oneBlock = new Image()
oneBlock.src = "./images/one-block.png"

const blockVertical = new Image()
blockVertical.src ="./images/seven-block-vertical.png"

const blockHorizontal  = new Image()
blockHorizontal.src = "./images/seven-block-horizontal.png"

const tube = new Image()
tube.src = "./images/tube.png" 

const piranha = new Image()
piranha.src = "./images/piranha.png"

const bowser = new Image()
bowser.src = "./images/bowser.png"

const fireball = new Image()
fireball.src = "./images/fireball.png"

const fireball2 = new Image()
fireball2.src = "./images/fireball-left.png"

const goombaImg = new Image()
goombaImg.src = "./images/goomba.png"

const marioFace = new Image()
marioFace.src = "./images/mario-face.png"

const flower = new Image()
flower.src = "./images/flower.png"

const fireballBowser = new Image()
fireballBowser.src = "./images/fireball.bowser.png"

let imgCharacter = marioImg


// Array of rockets
let rocketArray = [] 


// Playing variable

let playing = true

// Start the game
function startGame() {
    header.classList.add('hidden')
    gameBoard.classList.remove('hidden')
    update()
}

// Draw the margins of the game
const drawCourt = () => {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.strokeRect(0,0,canvas.width, canvas.height)
  
    ctx.lineWidth = 2
    ctx.moveTo(canvas.width / 2,0)
    ctx.stroke()
  }

  // Background Class

class Background {
  constructor() {
    this.img = backgroundImg,
    this.x = 0,
    this.speed = -0.5
  }
  move() {
    this.x += this.speed;
    this.x %= canvas.width;
  }

  draw() {
    ctx.drawImage (this.img, this.x, 0)
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.imgTest.width, 0)
    }
  }
  updateCanvas() {
    background.move()
    background.draw()
  }
}


let background = new Background()


//  Life Class

class Life {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.w = 50,
    this.h = 50
  }
    drawLife() {
      ctx.drawImage(marioFace, this.x, this.y, this.w, this.h)
    }

    drawScore() {
      ctx.fillStyle = "yellow"
      ctx.font = "20px Arial"
      ctx.fillText(`Score: ${lifes}`, 50, 50, this.w, this.h)
    }
    drawScore1() {
      if (lifes === 3) {
        ctx.drawImage(marioFace, 20, 25, this.w, this.h)
        ctx.drawImage(marioFace, 60, 25, this.w, this.h)
        ctx.drawImage(marioFace, 100, 25, this.w, this.h)
      }
      if (lifes === 2) {
        ctx.drawImage(marioFace, 20, 25, this.w, this.h)
        ctx.drawImage(marioFace, 60, 25, this.w, this.h)
      }
      if (lifes === 1) {
        ctx.drawImage(marioFace, 20, 25, this.w, this.h)
      }
    }
}

let lifes = 3;
let mario1 = new Life()


// Floor Class
class Floor {
    constructor() {
        this.x = 0,
        this.y = 450,
        this.h = 1000,
        this.w = 70
    }
    drawFloor() {
        ctx.drawImage(floorImg, this.x, this.y, this.h, this.w)
    }
}

let floor1 = new Floor();

// Player Class
class Player {
  constructor () {
    this.x = 50,
    this.y = 330,
    this.h = 50,
    this.w = 40,
    this.speed = 40,
    this.direction = "right"
    this.up = 0,
    this.left = 0,
    this.right = 0,
    this.blockRight = false,
    this.blockBot = false
  }

  drawPlayer(character) {
    ctx.drawImage(character, this.x, this.y, this.h, this.w)
    
    if (!this.blockBot) {
      this.moveDown()
    } 

    if (!this.blockRight) {
      this.x += this.right
    } 
    
    this.y -= this.up
    if  (this.up > 0){
      this.up--
    }

    this.x -= this.left
      if (this.left > 0) {
        this.left--
      }
    
    if (this.right > 0) {
      this.right--
    }
  }

  moveLeft() {
    if (this.x < 0) {
      return
    }
    this.left = 7
    imgCharacter = marioLeft
    this.direction = "left"
  }

  moveRight() {
    if ((this.x > canvas.width - this.w)) {
      return
    }
    this.right = 7
    imgCharacter = marioImg
    this.direction = "right"
  }

  moveUp() {
    if (this.y < 0) {
      return
    }
    this.up = 15
    imgCharacter = marioJump
  }

  moveDown () {
    if (this.y > canvas.height - 95) {
      return
    }
    this.y += 5
    if (this.y > canvas.height - 95) {
      imgCharacter = marioImg
    }
  }

  attack() {
    let attack = new Attack(fireball, this.x, this.y, this.direction)
    attackArray.push(attack)
  }

  contains(b){
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x) &&
      (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
  }

  containsRight(b){
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x)
  }

  containsBottom(b){
    return (this.y < b.y + b.h) &&
    (this.y + this.h > b.y)
  }
} 

let player1 = new Player()
let attackArray = [] 

// Platforms Class

class Platforms {
  constructor (img, x, y, w, h) {
    this.img = img
    this.x = x,
    this.y = y,
    this.w = w,
    this.h = h,
    this.color = "#5F1B1B"
  }
  drawPlatform() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  openDoor() {
    if (player1.x === 700) {
    obstacleVertical3 = obstacleVertical3 = new Platforms (this.color, 890, 230, 25, 180) 
  }
  }
}

// let tube1 = new Platforms(tube, 135, 375, 40, 75)
// let piranha1 = new Platforms(piranha, 135, 360, 40, 50)
// let bowser1 = new Platforms (bowser, 795, 360, 100, 100)
let obstacle1 = new Platforms (this.color, 195, 380, 25, 25)
let obstacle2 = new Platforms (this.color, 245, 355, 25, 25)
let obstacle3 = new Platforms (this.color, 295, 320, 25, 25)
let obstacle4 = new Platforms (this.color, 345, 290, 25, 25)
// let obstacleVertical1 = new Platforms (this.color, 400, 270, 25, 180)
// let obstacleVertical2 = new Platforms (this.color, 650, 230, 25, 175)
let obstacleVertical3 = new Platforms (this.color, 890, 230, 25, 220)
let obstacleHorizontal1 = new Platforms(this.color, 400, 270, 180, 25)
// let obstacleHorizontal2 = new Platforms(this.color, 650, 230, 100, 25)

const platformsArray = [obstacle1, obstacle2, obstacle3, obstacle4, obstacleVertical3, obstacleHorizontal1]

// Attack Class

class Attack {
  constructor (img, x, y, direction) {
    this.x = x,
    this.y = y,
    this.w = 50,
    this.h = 50,
    this.img = img,
    this.direction = direction
    this.speed = 5
  }

  drawAttack() {
    if (this.direction === "right") {
      this.x += this.speed
      ctx.drawImage(fireball, this.x, this.y, this.w, this.h)
    }
    else if (this.direction === "left") {
      this.x -= this.speed
      ctx.drawImage(fireball2, this.x, this.y, this.w, this.h)
    }
  }
  
  contains(b){
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x) &&
      (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
  }

}

let attack1 = new Attack()

// Champ Class

class Champ {
  constructor() {
    this.x = 360,
    this.y = 415,
    this.w = 30,
    this.h = 35,
    this.direction = "right",
    this.speed = 2
  }
    draw() {
      ctx.drawImage(goombaImg, this.x, this.y, this.w, this.h);
    }

    goombaMove() {
      if (this.direction === "right") {
        this.x += this.speed
      } else if (this.direction === "left") {
        this.x -= this.speed
      }

      if (this.x <= 300) {
       this.direction = "right"
      } else if (this.x >= 600) {
        this.direction = "left"
      }
    }

    containsBottom(b){
      return (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
    }
}

let goomba1 = new Champ()
let goomba2 = new Champ()

// Princess Class

class Princess {
  constructor() {
    this.x = 935,
    this.y = 410,
    this.w = 50,
    this.h = 40
  }
  drawPrincess() {
    ctx.drawImage(princessImg, this.x, this.y, this.w, this.h)
  }
}

let princess1 = new Princess()

// Rocket Class

class Rocket {
  constructor () {
    this.x = 1000,
    this.y = Math.floor(Math.random() * (canvas.height / 5)) + (canvas.height / 2),
    this.w = 50,
    this.h = 50,
    this.speed = 5
  }
  drawRocket() {
    this.x -= this.speed
    ctx.drawImage(rocket, this.x, this.y, this.w, this.h)
  }
}


// Flower Class

class Flower {
  constructor() {
    this.x = 465,
    this.y = 235,
    this.w = 35,
    this.h = 35
  }
    drawFlower () {
      ctx.drawImage(flower, this.x, this.y, this.w, this.h)
    }
}

let flower1 = new Flower()
let flowerTouch = true
let counterFlower = 0

let goombaHealth = 1

// Bowser Class

class Bowser {
  constructor () {
    this.x = 780,
    this.y = 0,
    this.w = 120,
    this.h = 120,
    this.positionY = 320,
    this.speed = 7,
    this.direction = "left"
  }
  drawBowser () {
    ctx.drawImage(bowser,this.x, this.y, this.w, this.h)
    this.bowserDown()
  }
  
  attackBowser() {
    let attack2 = new Attack(fireballBowser, this.x, Math.floor(Math.random()* 200) +235, this.direction)
    bowserAttack.push(attack2)
  }

  bowserDown () {
    if (this.y > canvas.height - 160) {
      return
    }
    this.y += this.speed
  }
}

let bowser1 = new Bowser()

// Every 3 seconds will create a rocket with Y random
setInterval (() => {
  let rocket1 = new Rocket()
  rocketArray.push(rocket1)
},4000)


let bowserAttack = []
setInterval(() => {
  bowser1.attackBowser()
},2000) 

// Start the game (button)
window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame()
    }
  }

// Events of the player
document.addEventListener("keydown", (e) => {
    if (e.keyCode  === 37) {
      player1.moveLeft()
    } else if (e.keyCode === 39) {
      player1.moveRight()
    } else if (e.keyCode === 38) {
      player1.moveUp()
    } else if (e.keyCode === 40) {
      player1.moveDown()
    } else if (e.keyCode === 32) {
      if (counterFlower >= 1) {
      player1.attack()
    }
  }
  })

  
let lastCol = 0
const drawPlatforms = () => {
  if (!player1.contains(platformsArray[lastCol])){
    player1.blockRight = false
    player1.blockBot = false
  }
  platformsArray.forEach ((el, index) => {
    el.drawPlatform()
    if (player1.contains(el)){

      if (player1.containsBottom(el)) {
        player1.blockBot = true
        lastCol = index
      }
    }
  })
}

const displayGameOver = () => {
  ctx.fillStyle = "white"
  ctx.font = "80px Arial"
  ctx.fillText("GAME OVER", 270, 150, canvas.width/2)
}

let goombaPlay = true
let bowserPlay = true
let bowserHealth = 700
let marioPlay = true
let marioHealth = 200

const update = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (playing) {
    background.updateCanvas()
    floor1.drawFloor()
    drawCourt()
    player1.drawPlayer(imgCharacter)
    princess1.drawPrincess()
    drawPlatforms()
    mario1.drawScore1()
    if (flowerTouch) {
      flower1.drawFlower()
    }
    if (player1.contains(flower1)) {
      flowerTouch = false
      counterFlower++
    }
    if (bowserPlay) {
       if(player1.x >= 0) {
      bowser1.drawBowser()
      for (let i =0; i < bowserAttack.length; i++) {
        bowserAttack[i].drawAttack()
      }
    } 
    for(let i= 0; i < attackArray.length; i++) {
      if (attackArray[i].contains(bowser1)) {
        bowserHealth--
        bowser1.h = 100,
        bowser1.w = 100,
        bowser1.y = 360
        attackArray.splice(i, 1)
    }
      if (bowserHealth === 0) {
        bowserPlay = false
        obstacleVertical3.h = 160
      }
    }
    for(let i= 0; i < bowserAttack.length; i++)
    if (bowserAttack[i].contains(player1)) {
      player1.x = 50,
      player1.y = 400
      lifes--
      bowserAttack.splice(i ,1)
    }
    if (lifes === 0) {
      displayGameOver( )
    }
    
    }
    for(let i = 0; i < attackArray.length; i++) {
      attackArray[i].drawAttack()
    }
    if (goombaPlay) {
      goomba1.draw()
      goomba1.goombaMove()
      if (player1.contains(goomba1)) {
      player1.x = 50,
      player1.y = 400
      lifes--
    } 

    for (let i = 0; i < attackArray.length; i++) {
      if (attackArray[i].contains(goomba1)) {
        goombaPlay = false
        attackArray.splice(i, 1)
      }
    }
  }
    for (let i = 0; i < rocketArray.length; i++) {
      rocketArray[i].drawRocket()
      if (player1.contains(rocketArray[i])) {
        player1.x = 50
        player1.y = 400
        lifes--
      }
    }}
    if (lifes === 0) {
      playing = false
      displayGameOver()
    }
    if (player1.contains(princess1)) {
      playing = false
      gif.classList.remove('hidden')
      gameBoard.classList.add('hidden')
    } 
    requestAnimationFrame(update)
}
