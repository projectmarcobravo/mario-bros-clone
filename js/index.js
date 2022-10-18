// Selecting  the canvas and creating the 2d mode
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const header = document.querySelector('.header')
const gif = document.querySelector('.gif')

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

let imgCharacter = marioImg


// Array of rockets
let rocketArray = [] 


// Playing variable

let playing = true

// Start the game
function startGame() {
    header.classList.add('hidden')
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


// Floor Class
class Floor {
    constructor() {
        this.x = 0,
        this.y = 450,
        this.h = 1000,
        this.w = 70,
        this.color = "brown"
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
    this.h = 20,
    this.w = 40,
    this.speed = 40,
    this.up = 0,
    this.left = 0,
    this.right = 0
  }
  drawPlayer(character) {
    ctx.drawImage(character, this.x, this.y, this.h, this.w)
    this.moveDown()
    this.y -= this.up
    if  (this.up > 0){
      this.up--
    }

    this.x -= this.left
      if (this.left > 0) {
        this.left--
      }
    this.x += this.right
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
  }

  moveRight() {
    if (this.x > canvas.width - this.w) {
      return
    }
    this.right = 7
    imgCharacter = marioImg
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

  contains(b){
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x) &&
      (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
  }
} 

let player1 = new Player()

// Platforms Class

class Platforms {
  constructor (img, x, y, w, h) {
    this.img = img
    this.x = x,
    this.y = y,
    this.w = w,
    this.h = h
  }
  drawPlatform() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

let tube1 = new Platforms(tube, 135, 375, 40, 75)
let piranha1 = new Platforms(piranha, 135, 360, 40, 50)
let obstacle1 = new Platforms (oneBlock, 195, 380, 25, 25)
let obstacle2 = new Platforms (oneBlock, 245, 355, 25, 25)
let obstacle3 = new Platforms (oneBlock, 295, 320, 25, 25)
let obstacle4 = new Platforms (oneBlock, 345, 290, 25, 25)
let obstacleVertical1 = new Platforms (blockVertical, 400, 270, 25, 180)
let obstacleVertical2 = new Platforms (blockVertical, 650, 230, 25, 175)
let obstacleVertical3 = new Platforms (blockVertical, 890, 230, 25, 175)
let obstacleHorizontal1 = new Platforms(blockHorizontal, 400, 270, 180, 25)
let obstacleHorizontal2 = new Platforms(blockHorizontal, 650, 230, 240, 25)

const platformsArray = [tube1, piranha1, obstacle1, obstacle2, obstacle3, obstacle4, obstacleVertical1, obstacleVertical2, obstacleVertical3, obstacleHorizontal1, obstacleHorizontal2]

setInterval (() => {

},3000)


// Princess Class

class Princess {
  constructor() {
    this.x = 950,
    this.y = 410,
    this.w = 20,
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

setInterval (() => {
  let rocket1 = new Rocket()
  rocketArray.push(rocket1)

},3000)


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
    }
  })

const drawPlatforms = () => {
  platformsArray.forEach ((el) => {
    el.drawPlatform()  
  }) 
}


const update = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (playing) {
    background.updateCanvas()
    floor1.drawFloor()
    drawCourt()
    player1.drawPlayer(imgCharacter)
    princess1.drawPrincess()
    drawPlatforms()
    for (let i = 0; i < rocketArray.length; i++) {
      rocketArray[i].drawRocket()
      if (player1.contains(rocketArray[i])) {
        player1.x = 50
        player1.y = 400
      }
    }}
    if (player1.contains(princess1)) {
      playing = false
      gif.classList.remove('hidden')
    } 
    requestAnimationFrame(update)
}
