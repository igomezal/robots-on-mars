
import { checkSizeError } from './ErrorHandling';

export class Planet {
    private grid: string[][] = [];

    constructor(xSize: number, ySize: number) {
        checkSizeError(xSize, ySize);
        
        for(let i: number = 0; i <= xSize; i++) {
            this.grid[i] = [];
            for(let j: number = 0; j <= ySize; j++) {
                this.grid[i][j] = 'X'; 
            }
        }
    }

    robotCanMove(position: [number, number]): boolean {
        checkSizeError(position[0], position[1]);
        
        return (position[0] >= 0 && position[0] < this.grid.length) && (position[1] >= 0 && position[1] < this.grid[0].length);
    }

    previouslyLostRobot(position: [number, number]): boolean {
        checkSizeError(position[0], position[1]);

        return this.grid[position[0]][position[1]] === 'LOST';
    }

    lostRobot(position: [number, number]) {
        checkSizeError(position[0], position[1]);
       
        this.grid[position[0]][position[1]] = 'LOST';
    }
}