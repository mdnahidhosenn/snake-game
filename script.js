const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.high-score');
const control = document.querySelectorAll('.controls i')

let gameOver = false;
let foodX, foodY;

let snakeX = 5 , snakeY =5;
let velocityX = 0 , velocityY = 0;

let snakeBody = []

let setIntervalId;
let score = 0;

let highScore = localStorage.getItem('high-score') || 0 ;
 highscoreElement.innerText = `High Score : ${highScore}`

const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function handleGameOver(){
    clearInterval(setIntervalId)
    alert('Game over please try again...')
    location.reload()
}

const changeDirection = e => {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
  

control.forEach(key =>{
    key.addEventListener('click',()=> changeDirection({key: key.dataset.key}))
})
function initGame(){

    if(gameOver) return handleGameOver()
    
    let htmlMarkup =`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    
    
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
       snakeBody.push([foodX , foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score',highScore)

        scoreElement.innerText = `Score : ${score}`
        highscoreElement.innerText = `High Score : ${highScore}`
    }
   
    for( let i = snakeBody.length -1 ; i>0; i--){

        snakeBody[i] = snakeBody[i-1];
    }
 

  snakeBody[0] = [snakeX , snakeY];
 

    snakeX +=velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <=0 || snakeY > 30){
  
      gameOver = true;
    }

    for(let i = 0; i <snakeBody.length; i++){

        
             htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
 
             if( i !== 0 && snakeBody[0][1] == snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]){
                gameOver= true;
             }
    }


    playBoard.innerHTML = htmlMarkup;
    
}

updateFoodPosition()

setIntervalId= setInterval(initGame , 120)

document.addEventListener('keyup',changeDirection)





