const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

// Game parameters
const cellSize = 35;
const playerSize = 1;
const enemySize = 1;

// Maze definition
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Initial player and enemies setup
let player = { x: 1, y: 1, speed: 1 };
let enemies = [
  { x: 7, y: 7, dx: 1, dy: 0, speed: 0.05 },
  { x: 7, y: 6, dx: 1, dy: 0.5, speed: 0.05 },
  { x: 3, y: 9, dx: -1, dy: 0, speed: 0.05 },
];

// Exit goal
const exit = { x: 13, y: 12 };

// Game state
let gameActive = true;

// Helper function to check if a cell is walkable
function canMoveTo(x, y) {
  return maze[Math.floor(y)][Math.floor(x)] === 0;
}

// Draw the game elements
function draw() {
  canvas.width = maze[0].length * cellSize;
  canvas.height = maze.length * cellSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the maze
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = "#000";
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  // Draw the exit (🎁)
  ctx.font = "30px sans-serif";
  ctx.fillText("🎁", exit.x * cellSize + -3, exit.y * cellSize + 30);

  // Draw the player (🎅)
  ctx.fillText("🎅", player.x * cellSize + -3, player.y * cellSize + 30);

  // Draw the enemies (🧑‍🎄)
  enemies.forEach((enemy) => {
    ctx.fillText("🧑‍🎄", enemy.x * cellSize + -20, enemy.y * cellSize + 30);
  });
}

// Update the game state (player and enemies)
function update() {
  if (!gameActive) return;

  // Update enemies' positions and check for wall collisions
  enemies.forEach((enemy) => {
    const newX = enemy.x + enemy.dx * enemy.speed;
    const newY = enemy.y + enemy.dy * enemy.speed;

    // Move enemy if the new position is walkable
    if (canMoveTo(newX, enemy.y)) enemy.x = newX;
    if (canMoveTo(enemy.x, newY)) enemy.y = newY;

    // Reverse direction if enemy hits a wall
    if (!canMoveTo(newX, enemy.y)) enemy.dx = -enemy.dx;
    if (!canMoveTo(enemy.x, newY)) enemy.dy = -enemy.dy;
  });

  // Check if player reached exit
  if (Math.abs(player.x - exit.x) < 0.5 && Math.abs(player.y - exit.y) < 0.5) {
    document.getElementById("message").textContent =
      "You win! Take a cookie! 🎁";
    restartButton.style.display = "inline-block";
    gameActive = false;
  }

  // Check if player collides with an enemy
  enemies.forEach((enemy) => {
    if (
      Math.abs(player.x - enemy.x) < 0.5 &&
      Math.abs(player.y - enemy.y) < 0.5
    ) {
      document.getElementById("message").textContent = "Game Over! Try again.";
      restartButton.style.display = "inline-block";
      gameActive = false;
    }
  });
}

// Movement based on key inputs
let keysPressed = {};

function movePlayer() {
  // Move player one grid step at a time when keys are pressed
  if (keysPressed["ArrowUp"] || keysPressed["w"]) {
    if (canMoveTo(player.x, player.y - 1)) player.y -= 1;
  }
  if (keysPressed["ArrowDown"] || keysPressed["s"]) {
    if (canMoveTo(player.x, player.y + 1)) player.y += 1;
  }
  if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
    if (canMoveTo(player.x - 1, player.y)) player.x -= 1;
  }
  if (keysPressed["ArrowRight"] || keysPressed["d"]) {
    if (canMoveTo(player.x + 1, player.y)) player.x += 1;
  }
}

// Keydown and keyup listeners
document.addEventListener("keydown", (event) => {
  if (!gameActive) return; // Ignore input if game is over
  keysPressed[event.key] = true;
  movePlayer();
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
});

// Restart game when the restart button is clicked
restartButton.addEventListener("click", () => {
  player = { x: 1, y: 1, speed: 1 };
  enemies = [
    { x: 7, y: 7, dx: 1, dy: 0, speed: 0.05 },
    { x: 5, y: 5, dx: 0, dy: 1, speed: 0.05 },
    { x: 3, y: 9, dx: -1, dy: 0, speed: 0.05 },
  ];
  gameActive = true;
  restartButton.style.display = "none";
  draw();
  requestAnimationFrame(gameLoop);
});

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
