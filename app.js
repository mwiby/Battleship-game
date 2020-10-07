


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