//THE FOLLOWING PARAMETERS ARE ONES THAT YOU CAN CHANGE

const empty = false; //Set to true for the boats, otherwise false for mapping the opponents ships
//Note that the grid still exists when it's true and can be used to map at the same time

const gridWidth = 8; //Adjust to change board size
const boatNum = 5; //Adjust to increase or decrease the number of boats

const scale = gridWidth >= 9? 1 : 2; //Adjust to change text size at a certain breaking point
//Changeable parameters OVER

const width = 125; //Only adjust if necessary, might screw things up idk man
const height = 125; //Same here ^

setDocDimensions(width, height);


//Title code - BATTLESHIP

//tysm Scott C who made the following letter commands for his crossword game this saved me so much time, huge credits to them
//Text engine (This part I wrote myself, I only copied the commands for the object)
function drawLetter(letter, posx, posy){ //Text engine essentially
  const turtle = new bt.Turtle();
  let commands = letters[letter].split(',');
  turtle.jump([posx, posy]);
  for (const command of commands){
    let instruct = command.split('$');
    switch(instruct[0]){
      case "sa":
        turtle.setAngle(parseFloat(instruct[1]));
        break;
      case "f":
        turtle.forward(parseFloat(instruct[1])*scale);
        break;
      case "r":
        turtle.right(parseFloat(instruct[1]));
        break;
      case "l":
        turtle.left(parseFloat(instruct[1]));
        break;
      case "arc":
        turtle.arc(parseFloat(instruct[1].split(":")[0]), parseFloat(instruct[1].split(":")[1])*scale);
        break;
      case "u":
        turtle.up();
        break;
      case "d":
        turtle.down();
        break;
    }
  }
  drawLines(turtle.lines());
}

const letters = { //tysm Scott C who made the following letter commands for his crossword game this saved me so much time, huge credits to them
  "a": `sa$90,f$2,r$90,f$2,r$90,f$2,u,sa$90,f$2,d,l$30,f$2,l$120,f$2`,
  "b": `sa$90,f$4,r$90,f$1,arc$-180:1,f$1,r$180,f$1,arc$-180:1,f$1`,
  "c": `sa$90,u,r$90,f$2,r$180,d,arc$-180:2`,
  "d": `sa$90,f$4,r$90,arc$-180:2`,
  "e": `sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2,u,f$-2,r$90,f$2,l$90,d,f$2`,
  "f": `sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2`,
  "g": `u,f$1,sa$90,f$2,r$90,d,arc$-270:1,f$2,arc$-90:1`,
  "h": `sa$90,f$4,u,f$-2,r$90,d,f$2,u,l$90,f$-2,d,f$4`,
  "i": `f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2`,
  "j": `sa$90,u,f$4,r$90,d,f$2,u,f$-1,r$90,d,f$3,arc$90:1`,
  "k": `sa$90,f$4,u,f$-2,r$45,d,f$2.75,u,f$-2.75,r$90,d,f$2.75`,
  "l": `sa$90,u,f$4,r$180,d,f$4,l$90,f$2`,
  "m": `sa$90,f$4,sa$0,r$71.57,f$3.162,sa$0,l$71.57,f$3.162,sa$0,r$90,f$4`,
  "n": `sa$90,f$4,r$153.43,f$4.47,l$153.43,f$4`,
  "o": `sa$90,u,f$1,d,f$2,arc$-180:1,f$2,arc$-180:1`,
  "p": `sa$90,f$4,r$90,f$1,arc$-180:1,f$1`,
  "q": `sa$90,u,f$1,d,f$2,arc$-180:1,f$2,arc$-180:1,u,r$90,f$1,r$45,d,f$1.414`,
  "r": `sa$90,f$4,r$90,f$1,arc$-180:1,f$1,sa$-45,f$2.8284`,
  "s": `f$1,arc$180:1,arc$-180:1,f$1`,
  "t": `u,f$1,sa$90,d,f$4,u,r$90,f$-1,d,f$2`,
  "u": `sa$90,u,f$4,sa$-90,d,f$3,arc$180:1,f$3`,
  "v": `sa$90,u,f$4,r$165.96,d,f$4.12,l$151.93,f$4.12`,
  "w": `sa$90,u,f$4,sa$0,r$82.87,d,f$4.03,sa$0,l$63.43,f$1.12,sa$0,r$63.43,f$1.12,sa$0,l$82.87,f$4.03`,
  "x": `sa$90,u,f$4,r$153.44,d,f$4.47,u,l$153.44,f$4,l$153.44,d,f$4.47`,
  "y": `u,f$1,sa$90,d,f$2.5,r$33.69,f$1.8,u,f$-1.8,l$67.38,d,f$1.8`,
  "z": `u,f$2,d,f$-2,l$63.44,f$4.47,r$63.44,f$-2`,
  ["0"]: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,f$2,arc$45:1,sa$-66.80,d,f$3.675`,
  ["1"]: `sa$0,u,f$1,d,sa$90,f$4,l$150,f$2`,
  ["2"]: `u,f$2,r$180,d,f$2,sa$90,arc$-90:1,arc$90:1,f$1,arc$180:1`,
  ["3"]: `sa$90,u,f$4,r$90,d,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1`,
  ["4"]: `u,f$2,sa$90,f$1,l$90,d,f$2,r$116.57,f$3.35,sa$-90,f$4`,
  ["5"]: `u,sa$90,f$1,r$180,d,arc$-180:1,f$1,arc$-90:1,arc$90:1,sa$0,f$2`,
  ["6"]: `u,f$1,sa$90,f$2,r$90,d,arc$-360:1,u,arc$-270:1,d,f$2,arc$-150:1`,
  ["7"]: `u,f$2,r$180,d,f$2,sa$90,arc$-90:1,arc$90:1,f$1,arc$180:1`,
  ["8"]: `u,f$1,d,arc$-180:1,arc$360:1,arc$-180:1`,
  ["9"]: ``,
}

let text = "battleship7";
let X = width/2 - 25;
let Y = height - 10;
let increment = 0;
for(const letter of text){
  drawLetter(letter, X + increment, Y);
  increment += 5
}

//Making the grid and letters
const finalLines = [];

const mainframe = [ //Main outer grid
  [5, height-15],
  [width-5, height-15],
  [width-5, 5],
  [5, 5],
  [5, height-15]
];

//Inner grid
function drawLine(pointA, pointB){ //Lazy function and also pointA and B are arrays like [number, number]
  const turtle = new bt.Turtle();
  turtle.jump(pointA);
  turtle.goTo(pointB);
  drawLines(turtle.lines());
}

const gapx = (width-10)/(gridWidth+1);
const gapy = (height-20)/(gridWidth+1);

let A = [5, height-15]
let B = [5, 5]
//Draws columns
for(let i=0; i < gridWidth + 1; i++){
  drawLine(A, B);
  A[0] += gapx;
  B[0] += gapx;
}

A = [5, height-15];
B = [width-5, height-15];
//Draws rows
for(let i=0; i < gridWidth + 1; i++){
  drawLine(A, B);
  A[1] -= gapy;
  B[1] -= gapy;
}
//Completed inner grid


//Letter drawing
let alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet = alphabet.slice(0,gridWidth);

//height-15 = start of grid i think
X = 5+gapx;
Y = width-25-gapy;
let xcp = gapx/2 + scale*2 - 5; //X center padding
let ycp = 0; //Y center padding
for(const letter of alphabet){
  drawLetter(letter, 5+xcp, Y); //Draws the row letters
  drawLetter(letter, X, width-12.5-gapy); //Draws the column letters
  X+=gapx;
  Y-=gapy;
};

//Letters complete
finalLines.push(mainframe);

drawLines(finalLines);