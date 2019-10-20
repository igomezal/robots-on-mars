# Robots in Mars

Simple project which place robots on Mars, following certain rules:

* Mars has a rectangular grid within the robots are able to move.
* If a robot is lost, it will place a mark in the grid so other robots are are not lost in the same place.
* A robot knows its coordinates and the direction it is orientated.
* A robot is able to do the following things:
    * Move forward: the robot moves in the direction it is orientated.
    * Move left: the robot turns left 90 degrees.
    * Move right: the robot turns right 90 degrees.

## How to use

1. Install dependencies using `npm i` or `yarn`
2. Just run it using `npm start` or `yarn start`

If you want to add more robots, just update `input.txt` file with new coordinates and instructions for your new robots, or just use another file (just change `start` script with the name of your file).