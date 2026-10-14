const size = 100;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const cellSize = canvas.width / size;

const grid = Array.from({ length: size }, () => Array(size).fill(0));
let x = 50, y = 50, dir = 0, steps = 0;
const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

function loop() {
  // 1. Ant logic (1 step)
  if (grid[y]![x] === 0) {
    dir = (dir + 1) % 4; // Turn right
    grid[y]![x] = 1;     // Turn black
  } else {
    dir = (dir + 3) % 4; // Turn left
    grid[y]![x] = 0;     // Turn white
  }

  x = (x + dx[dir]! + size) % size;
  y = (y + dy[dir]! + size) % size;
  steps++;

  // 2. Rendering
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#2c3e50";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r]![c] === 1) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
  }

  // Draw the red ant
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

  document.getElementById("steps")!.innerText = `Steps: ${steps}`;

  // Delay to make it clearly visible (approx 30fps)
  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 30);
}

loop();