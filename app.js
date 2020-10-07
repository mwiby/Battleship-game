


// Selectors for the boards and all the ships container
const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const displayGrid = document.querySelector('.grid-display');
const ships = document.querySelectorAll('ship');
const destroyer = document.querySelector('.destroyer-container');
const submarine = document.querySelector('.submarine-container');
const cruiser = document.querySelector('.cruiser-container');
const battleship = document.querySelector('.battleship-container');
const carrier = document.querySelector('.carrier-container');

// Selectors for button and text info
const startButton = document.querySelector('#start');
const rotateButton = document.querySelector('#rotate');
const turnDisplay = document.querySelector('#whose-turn');
const infoDisplay = document.querySelector('#info');


// Board size 10 x 10
const width = 10;

// All the squares in the Boards
const userSquares = [];
const computerSquares = [];

// Create Board
function createBoard(grid, squares) {
    for(let i = 0; i < width*width; i++){
        const square = document.createElement('div');
        square.dataset.id= i;
        grid.appendChild(square);
        squares.push(square);
    }
}

createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);


// Ships

const shipArray = [
    {
        name: 'destroyer',
        directions: [
            [0,1],
            [0,width]
        ]
    },
    {
        name: 'submarine',
        directions: [
            [0,1,2],
            [0,width,width*2]
        ]
    },
    {
        name: 'cruiser',
        directions: [
            [0,1,2],
            [0,width,width*2]
        ]
    },
    {
        name: 'battleship',
        directions: [
            [0,1,2,3],
            [0,width,width*2,width*3]
        ]
    },
    {
        name: 'carrier',
        directions: [
            [0,1,2,3,4],
            [0,width,width*2,width*3,width*4]
        ]
    },
    ];

    // Place the computer ships in random posisions

function generate(ship){
    //direction - horisont ore vertical
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];

    if(randomDirection === 0) direction = 1;
    if(randomDirection === 1) direction = 10;
    //start posisjon
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length*direction)));

    // Check if square is taken
    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
    // Controll for the right egde of board
    const hitRightEdge = current.some(index => (randomStart + index) % width === width - 1);
    const hitLeftEgde = current.some(index => (randomStart + index) % width === 0);

    // Check if possible to build ship at given posisjon
    if(!isTaken && !hitRightEdge && !hitLeftEgde){
        current.forEach(index => computerSquares[randomStart + index].classList.add('taken',ship.name));
    }
    else 
    generate(ship);
}

generate(shipArray[0]);
generate(shipArray[1]);
generate(shipArray[2]);
generate(shipArray[3]);
generate(shipArray[4]);
