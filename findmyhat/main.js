const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const hat = '🏰';
const hole = '🌲';
const fieldCharacter = '🔹';
const pathCharacter = '🤺';
const row = 10;
const col = 10;

class Field {

    field = [];

    constructor() {
        //this.field = field;
        this.locationX = 0;
        this.locationY = 0;

        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }

        this.generateField();
    }

    /**
     * Initialise Field
     */
    generateField() {
        //console.log("generate field");

        //grass
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                this.field[y][x] = fieldCharacter;
            }
        }

        this.generateHole();

        // Set the castle location
        const hatLocation = () => {
            hatLocation.x = Math.floor(Math.random() * row);
            hatLocation.y = Math.floor(Math.random() * col);
            // Ensure castle position is not [0][0]
            while (hatLocation.x === 0 && hatLocation.y === 0) {
                hatLocation.x = Math.floor(Math.random() * row);
                hatLocation.y = Math.floor(Math.random() * col);
            }
            this.field[hatLocation.y][hatLocation.x] = hat;
        }
        hatLocation();

        //Initialise starting point
        this.field[0][0] = pathCharacter;
    }

    /**
     * Generate trees for field using random number within grid
     */
    generateHole() {
        let x = 0;
        let y = 0;

        for (let i = 0; i < 10; i++) {
            x = Math.floor(Math.random() * row);
            y = Math.floor(Math.random() * col);

            this.field[y][x] = hole;
        }
    }

    /**
     * Continues game until knight goes out of bounds, hits a tree, or reach the castle
     */
    runGame() {
        //console.log("runGame");
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            // console.log("locationX:", this.hilocationX);
            // console.log("locationY:", this.locationY);

            if (!this.isInBounds()) {
                console.log('You have reached the end of the world...');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Ack! A tree!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('You have arrived!');
                playing = false;
                break;
            }
            // Update the current location on the map
            this.field[this.locationY][this.locationX] = pathCharacter;
            //console.log("updated pathCharacter:", pathCharacter);
        }
    }

    /**
     * Display Field
     */
    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    /**
     * Prompts player to move and moves the knight on the Field accordingly
     */
    askQuestion() {
       // console.log("askQuestion");
        const answer = prompt('Which way? ').toUpperCase();

        this.field[this.locationY][this.locationX] = fieldCharacter;

        if (answer == 'U') {
            this.locationY -= 1;
        } else if (answer == 'D') {
            this.locationY += 1;
        } else if (answer == 'L') {
            this.locationX -= 1;
        } else if (answer == 'R') {
            this.locationX += 1;
        } else {
            console.log('Enter (u, d, l or r.)');
            this.askQuestion();
        }
    }

    /**
     * Checks if the knight is within bounds
     * @returns Boolean
     */
    isInBounds() {
        //console.log("check isInBounds Y:%d X:%d", this.locationY, this.locationX);
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    /**
     * Checks if knight reached castle
     * @returns Boolean
     */
    isHat() {
        //console.log("isHat Y:%d X:%d", this.locationY, this.locationX);
        return this.field[this.locationY][this.locationX] === hat;
    }

    /**
     * Checks if knight hits a tree
     * @returns Boolean
     */
    isHole() {
        //console.log("isHole Y:%d X:%d", this.locationY, this.locationX);
        return this.field[this.locationY][this.locationX] === hole;
    }
} //End of Class

const myfield = new Field();
myfield.runGame();
