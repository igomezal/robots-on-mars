import { checkSizeError, checkInstructionError } from './ErrorHandling';

const PossibleOrientation = ['N', 'E', 'S', 'W'];

const getCorrectIndex = (index: number) => {
    if(index < 0) {
        return index % PossibleOrientation.length + PossibleOrientation.length;
    } else if (index >= PossibleOrientation.length) {
        return index % PossibleOrientation.length;
    }
    return index;
}

export class Robot {
    private position: [number, number];
    private orientation: string;
    private lost: boolean

    constructor(position: [number, number], orientation: string) {
        checkSizeError(position[0], position[1]);

        this.position = position;
        this.orientation = orientation;
        this.lost = false;
    }

    placeRobot(position: [number, number], orientation: string) {
        checkSizeError(position[0], position[1]);

        this.position = position;
        this.orientation = orientation;
    }

    markAsLost() {
        this.lost = true;
    }

    private interpretInstruction(character: string): [number, number, string] {
        switch(character) {
            case 'L': {
                return [this.position[0], this.position[1], PossibleOrientation[getCorrectIndex(PossibleOrientation.indexOf(this.orientation) - 1)]];
            }
            case 'R': {
                return [this.position[0], this.position[1], PossibleOrientation[getCorrectIndex(PossibleOrientation.indexOf(this.orientation) + 1)]];
            }
            case 'F': {
                const finalPosition = this.moveForward(this.position);
                return [finalPosition[0], finalPosition[1], this.orientation];
            }
            default: {
                throw new Error('Instruction not implemented');
            }
        }
    }

    private moveForward(initialPosition:[number, number]): [number, number] {
        let moveEastWest = 0;
        let moveNorthSouth = 0;

        if(this.orientation === 'N') {
            moveNorthSouth = 1;
        } else if(this.orientation === 'E') {
            moveEastWest = 1;
        } else if(this.orientation === 'S') {
            moveNorthSouth = -1;
        } else if(this.orientation === 'W') {
            moveEastWest = -1;
        }

        return [initialPosition[0] + moveEastWest, initialPosition[1] + moveNorthSouth];
    }

    nextPosition(instruction: string): [[number, number, string], string] {
        checkInstructionError(instruction);
        return [this.interpretInstruction(instruction[0]), instruction.slice(1)]
    }

    printPositionAndStatus() {
        console.log(`${this.position[0]} ${this.position[1]} ${this.orientation} ${this.lost? 'LOST' : ''}`);
    }
}