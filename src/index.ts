// Grid configuration: 100x100 grid with wrap-around (Pac-Man style)
const GRID_SIZE = 100;
const TOTAL_STEPS = 15000;

enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

class LangtonAnt {
  private grid: number[][];
  private x: number;
  private y: number;
  private direction: Direction;

  constructor() {
    // 0 = White, 1 = Black
    this.grid = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(0)
    );
    this.x = Math.floor(GRID_SIZE / 2);
    this.y = Math.floor(GRID_SIZE / 2);
    this.direction = Direction.NORTH;
  }

  public step(): void {
    const currentColor = this.grid[this.y][this.x];

    if (currentColor === 0) {
      // Turn right (90 degrees clockwise)
      this.direction = (this.direction + 1) % 4;
      // Flip color to black
      this.grid[this.y][this.x] = 1;
    } else {
      // Turn left (90 degrees counter-clockwise)
      this.direction = (this.direction + 3) % 4;
      // Flip color to white
      this.grid[this.y][this.x] = 0;
    }

    // Move forward 1 unit with Pac-Man style wrap-around
    switch (this.direction) {
      case Direction.NORTH:
        this.y = (this.y - 1 + GRID_SIZE) % GRID_SIZE;
        break;
      case Direction.EAST:
        this.x = (this.x + 1) % GRID_SIZE;
        break;
      case Direction.SOUTH:
        this.y = (this.y + 1) % GRID_SIZE;
        break;
      case Direction.WEST:
        this.x = (this.x - 1 + GRID_SIZE) % GRID_SIZE;
        break;
    }
  }

  public run(steps: number): void {
    console.log(`Starting simulation for ${steps} steps...`);
    for (let i = 0; i < steps; i++) {
      this.step();
    }
    console.log(`Simulation finished at position (${this.x}, ${this.y}).`);
  }
}

const ant = new LangtonAnt();
ant.run(TOTAL_STEPS);