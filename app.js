
document.addEventListener('DOMContentLoaded', () => {


// Selectors for the boards and all the ships container
const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const displayGrid = document.querySelector('.grid-display');
const ships = document.querySelectorAll('.ship');
const destroyer = document.querySelector('.destroyer-container');
const submarine = document.querySelector('.submarine-container');
const cruiser = document.querySelector('.cruiser-container');
const battleship = document.querySelector('.battleship-container');
const carrier = document.querySelector('.carrier-container');

// Selectors for button and text info
const rotateButton = document.querySelector('#rotate');

// Default for rotate
let isHorizontal = true;

// Board size 10 x 10
const width = 10;

// All the squares in the two Boards
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
    // Controll for the left egde of board
    const hitLeftEgde = current.some(index => (randomStart + index) % width === 0);

    // Check if possible to build ship at given posisjon
    if(!isTaken && !hitRightEdge && !hitLeftEgde){
        current.forEach(index => computerSquares[randomStart + index].classList.add('taken',ship.name));
    }
    else 
    generate(ship);
} 

// Creating Ships
    shipArray.forEach(index => generate(index));


// rotate the ships * Improve later *
function rotate(){

    if(isHorizontal){
        destroyer.classList.toggle('destroyer-container-vertical');
        submarine.classList.toggle('submarine-container-vertical');
        cruiser.classList.toggle('cruiser-container-vertical');
        battleship.classList.toggle('battleship-container-vertical');
        carrier.classList.toggle('carrier-container-vertical');
        isHorizontal = false;
        return
    }
    if(!isHorizontal){
        destroyer.classList.toggle('destroyer-container-vertical');
        submarine.classList.toggle('submarine-container-vertical');
        cruiser.classList.toggle('cruiser-container-vertical');
        battleship.classList.toggle('battleship-container-vertical');
        carrier.classList.toggle('carrier-container-vertical');
        isHorizontal = true;
        return
    }
    

}

rotateButton.addEventListener('click',rotate);

//move ships
ships.forEach(ship => ship.addEventListener('dragstart',dragStart));
userSquares.forEach(square => square.addEventListener('dragstart',dragStart));
userSquares.forEach(square => square.addEventListener('dragover',dragOver));
userSquares.forEach(square => square.addEventListener('dragenter',dragEnter));
userSquares.forEach(square => square.addEventListener('dragleave',dragLeave));
userSquares.forEach(square => square.addEventListener('drop',dragDrop));
userSquares.forEach(square => square.addEventListener('dragend',dragEnd));



let shipId;
let draggedShip;
let draggedShipLength;


// Which part of the ship
ships.forEach(ship => ship.addEventListener('mousedown', (e) => {

    shipId = e.target.id;
}))

function dragStart() {
    
    draggedShip = this;
    
    draggedShipLength = draggedShip.children.length;
}
function dragOver(e) {
    e.preventDefault();    
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {
  
}
function dragDrop() {
    let shipNameId = draggedShip.lastElementChild.id;
    let shipClass = shipNameId.slice(0,-2);
    let lastShipIndex = parseInt(shipNameId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id); 
    console.log(shipLastId);

    selectedShipIndex = parseInt(shipId.substr(-1));
    

    shipLastId = shipLastId - selectedShipIndex;
    console.log(shipLastId);

    if(isHorizontal){
        for(let i=0; i < draggedShipLength; i++){
            userSquares[parseInt(this.dataset.id) - shipLastId + i].classList.add('taken',shipClass);
        }
    }else if(!isHorizontal) {
        for(let i=0; i < draggedShipLength; i++){
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * 1].classList.add('taken',shipClass);
        }
            

        
    }
    else return;

    displayGrid.removeChild(draggedShip);
}
function dragEnd() {
    
}

})

