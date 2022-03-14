import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const htmlCode = `<main class="main-container">
  <h1>Snake Game</h1>
  <p>Press SpaceBar to start!</p>
  <p>Press X to stop!</p>
  <canvas id="snake-canvas" width="400" height="400"></canvas>
</main>`;

const cssCode = `.main-container {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}`;

const jsCode = `/*
High-level approach
1. Scope out how to manage the game state
2. Figure out how to draw the board and initial score
3. Figure out how to move one square with the arrow keys
4. Figure out how to place apples randomly on the board
5. Figure out how to add the tail at the end after eating apple, randomizing new apple position, bumping score
6. Figure out collision detection with itself to end the game or hitting the borders to end the game
Bonus: Starting game after pressing spacebar key/showing initial help information, keeping track of high score in localstorage, restarting game by pressing a key, adding obstacles, etc.
*/

const snakeCanvas = document.getElementById("snake-canvas");
const snakeCtx = snakeCanvas.getContext("2d");

// Initialize the game state
// Keep track of player position playerX, playerY
let playerX = 8;
let playerY = 8;
// Keep track of apple position appleX, appleY
let appleX = 12;
let appleY = 12;
// Keep track of snake trail positions in an array [{x,y}, {x,y},...]
let trail = [];
const initialTailLength = 2;
let tail = initialTailLength;
// 15 x 15 board
const totalCells = 15;
// 400 width/height grid
const cellLength = 400 / totalCells;
// Set the velocity as snake keeps on moving with momentum, velocityX and velocityY
let velocityX = -1;
let velocityY = 0;
// Keep track of the score aka number of apples eaten
let score = 0;

// Handle moving snake in response to arrow key down
document.addEventListener("keydown", moveSnake);

const framesPerSecond = 1000 / 10;
let gameIntervalId = null;
gameStep();

function gameStep() {
  // Keep moving the player in the same direction
  playerX += velocityX;
  playerY += velocityY;

  // Color the board
  snakeCtx.fillStyle = "black";
  snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  // Color the player/snake trail
  snakeCtx.fillStyle = "lime";
  snakeCtx.fillRect(
    playerX * cellLength,
    playerY * cellLength,
    cellLength - 2,
    cellLength - 2
  );

  // Color the player snake trail
  for (let i = 0; i < trail.length; i++) {
    snakeCtx.fillRect(
      trail[i].x * cellLength,
      trail[i].y * cellLength,
      cellLength - 2,
      cellLength - 2
    );
    if (trail[i].x === playerX && trail[i].y === playerY) {
      return gameOver();
    }
  }
  // Add onto trail with player's current position
  trail.push({ x: playerX, y: playerY });
  // Remove the ends of trail to stay within length of tail as we move around
  while (trail.length > tail) {
    trail.shift();
  }

  // Color the apple
  snakeCtx.fillStyle = "red";
  snakeCtx.fillRect(
    appleX * cellLength,
    appleY * cellLength,
    cellLength - 2,
    cellLength - 2
  );

  // If player position hits the borders, we should stop the game
  const playerHitBorders =
    playerX < 0 ||
    playerX >= totalCells ||
    playerY < 0 ||
    playerY >= totalCells;
  if (playerHitBorders) {
    console.log("Player hit borders, game over");
    return gameOver();
  }

  // If the player eats an apple, we should bump the score, randomize the next location of the apple
  if (playerX === appleX && playerY === appleY) {
    score++;
    tail++;
    appleX = Math.floor(Math.random() * totalCells);
    appleY = Math.floor(Math.random() * totalCells);
  }

  // Update the score
  updateScore();
}

function gameOver() {
  updateScore();
  playerX = 8;
  playerY = 8;
  tail = initialTailLength;
  score = 0;
  trail = [];
  clearInterval(gameIntervalId);
  gameIntervalId = null;
}

function updateScore() {
  snakeCtx.font = "30px Georgia";
  snakeCtx.fillStyle = "white";
  snakeCtx.fillText(score, 200, 50);
}

// Move the snake in response to pressing arrow keys
// by changing the velocity direction
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const spaceBarKey = 32;
const xKey = 88;
function moveSnake(event) {
  switch (event.keyCode) {
    case leftKey:
      velocityX = -1;
      velocityY = 0;
      break;
    case upKey:
      velocityX = 0;
      velocityY = -1;
      break;
    case rightKey:
      velocityX = 1;
      velocityY = 0;
      break;
    case downKey:
      velocityX = 0;
      velocityY = 1;
      break;
    case spaceBarKey:
      if (gameIntervalId === null) {
        gameIntervalId = setInterval(gameStep, framesPerSecond);
      }
      break;
    case xKey:
      clearInterval(gameIntervalId);
      gameIntervalId = null;
      break;
    default:
    // Ignore any other keys
  }
}
`;

const Snake: NextPage = () => {
  return (
    <div>
      <p>Source: https://frontendeval.com/questions/snake</p>
      <p>
        Code Pen Example: https://codepen.io/alfinity/pen/MWOMeXe?editors=1111
      </p>
      <Prism.Tabs>
        <Prism.Tab label="snake.js" language="javascript">
          {jsCode}
        </Prism.Tab>
        <Prism.Tab label="index.scss" language="css">
          {cssCode}
        </Prism.Tab>
        <Prism.Tab label="index.html" language="markup">
          {htmlCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default Snake;
