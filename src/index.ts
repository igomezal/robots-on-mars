import fs from 'fs';

import { Planet } from './Planet';
import { Robot } from './Robot';

interface RobotData {
     initialCoordinates: [number, number, string],
     instructions: string,
}

const fileToRead = process.argv.slice(2)[0]; 

if (!fileToRead) throw new Error('You have to specify the file to read');

fs.readFile(fileToRead, 'utf-8', (err, data) => {
    if(err) throw new Error(`There is an error reading the file ${err}`);
    
    const lines: string[] = data.split('\n');
    const planetCoordinates = lines.shift().split(' ').map((coordinate) => parseInt(coordinate));
    const mars: Planet = new Planet(planetCoordinates[0], planetCoordinates[1]);

    const robots: RobotData[] = [];

    while(lines.length > 0) {
        const initialCoordinateFromFile = lines.shift().split(' ');
        const initialCoordinates: [number, number, string] = [parseInt(initialCoordinateFromFile[0]), parseInt(initialCoordinateFromFile[1]), initialCoordinateFromFile[2]];
        const instructions = lines.shift();

        robots.push({initialCoordinates, instructions});
    }

    robots.forEach(robot => {
        const movingRobot = new Robot([robot.initialCoordinates[0], robot.initialCoordinates[1]], robot.initialCoordinates[2]);
        let robotInstructions = robot.instructions;
        let previousCoordinate: [number, number] = [robot.initialCoordinates[0], robot.initialCoordinates[1]];
        while(robotInstructions.length > 0) {
            const [newCoordinate, newRobotInstruction] = movingRobot.nextPosition(robotInstructions);

            if(mars.robotCanMove([newCoordinate[0], newCoordinate[1]]) ) {
                movingRobot.placeRobot([newCoordinate[0], newCoordinate[1]], newCoordinate[2]);
                previousCoordinate = [newCoordinate[0], newCoordinate[1]];
                robotInstructions = newRobotInstruction;
            } else if (mars.previouslyLostRobot(previousCoordinate)){
                robotInstructions = newRobotInstruction;
            } else {
                movingRobot.markAsLost();
                mars.lostRobot(previousCoordinate);
                robotInstructions = '';
            }
        }

        movingRobot.printPositionAndStatus();
    });
});