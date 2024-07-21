//THE FOLLOWING PARAMETERS ARE ONES THAT YOU CAN CHANGE

const empty = false; //Set to true for the boats, otherwise false for mapping the opponents ships
//Note that the grid still exists when it's true and can be used to map at the same time

const gridWidth = 10; //Adjust to change board size, recommended 10 as there are bugs present outside these boundaries
const boatNum = 5; //Adjust to increase or decrease the number of boats, longest ship will be this value + 1

let scale = gridWidth >= 9 ? (gridWidth >= 15 ? 0.5 : 1) : 2; //Adjust to change text size at a certain breaking point
//Changeable parameters OVER

//Keep these two parameters the same preferably for better gameplay and avoiding a bug I never bothered to fix
const width = 125; //Only adjust if necessary, might screw things up idk man
const height = 125; //Same here ^

setDocDimensions(width, height);


//Title code - BATTLESHIP

//tysm Scott C who made the following letter commands for his crossword game this saved me so much time, huge credits to them
//Text engine (This part I wrote myself, I only copied the commands for the object)
function drawLetter(letter, posx, posy) { //Text engine essentially
  if (parseInt(letter)) {
    if (letter >= 10) {
      handleNumber(letter, posx, posy);
      return;
    }
  }
  var l = letter.toString();
  const turtle = new bt.Turtle();
  let commands = letters[l].split(',');
  turtle.jump([posx, posy]);
  for (const command of commands) {
    let instruct = command.split('$');
    switch (instruct[0]) {
      case "sa":
        turtle.setAngle(parseFloat(instruct[1]));
        break;
      case "f":
        turtle.forward(parseFloat(instruct[1]) * scale);
        break;
      case "r":
        turtle.right(parseFloat(instruct[1]));
        break;
      case "l":
        turtle.left(parseFloat(instruct[1]));
        break;
      case "arc":
        turtle.arc(parseFloat(instruct[1].split(":")[0]), parseFloat(instruct[1].split(":")[1]) * scale);
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

function handleNumber(letter, posx, posy) {
  let x = posx;
  let y = posy;
  const increment = scale * 3;
  for (const digit of letter.toString()) {
    drawLetter(digit, x - scale * 1.5, y);
    x += increment;
  }
  return false; //Just tells it to skip everything
};

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
  "j": `sa$90,u,f$4,r$90,d,f$2,u,f$-1,r$90,d,f$3,arc$-90:1`,
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
  ["0"]: `sa$90,u,f$1,d,f$2,arc$-180:1,f$2,arc$-180:1,u,f$2,arc$-45:1,sa$-66.80,d,f$3.675`,
  ["1"]: `sa$0,u,f$1,d,sa$90,f$4,l$150,f$2`,
  ["2"]: `u,f$2,r$180,d,f$2,sa$90,arc$-90:1,arc$90:1,f$1,arc$180:1`,
  ["3"]: `sa$90,u,f$4,r$90,d,f$1,arc$-180:1,f$1,r$180,f$1,arc$-180:1,f$1`,
  ["4"]: `u,f$2,sa$90,f$1,l$90,d,f$2,r$116.57,f$3.35,sa$-90,f$4`,
  ["5"]: `u,sa$90,f$1,r$180,d,arc$180:1,f$1,arc$90:1,arc$-90:1,sa$0,f$2`,
  ["6"]: `u,f$1,sa$90,f$2,r$90,d,arc$-360:1,u,arc$-270:1,d,f$2,arc$-150:1`,
  ["7"]: `sa$90,u,f$4,r$90,d,f$2,r$117,f$4.4`,
  ["8"]: `u,f$1,d,arc$180:1,arc$-360:1,arc$180:1`,
  ["9"]: `u,sa$90,f$2,r$90,f$1,d,arc$360:1,u,arc$90:1,f$0.87,d,r$180,f$4`,
}

let tempScale = scale;
scale = 2;
let text = "blottleship";
let X = width / 2 - 27;
let Y = height - 10;
let increment = 0;
for (const letter of text) {
  drawLetter(letter, X + increment, Y);
  increment += 5
}
scale = tempScale;

//Making the grid and letters
const finalLines = [];

const mainframe = [ //Main outer grid
  [5, height - 15],
  [width - 5, height - 15],
  [width - 5, 5],
  [5, 5],
  [5, height - 15]
];

//Inner grid
function drawLine(pointA, pointB) { //Lazy function and also pointA and B are arrays like [number, number]
  const turtle = new bt.Turtle();
  turtle.jump(pointA);
  turtle.goTo(pointB);
  drawLines(turtle.lines());
}

const gapx = (width - 10) / (gridWidth + 1);
const gapy = (height - 20) / (gridWidth + 1);

let A = [5, height - 15]
let B = [5, 5]
//Draws columns
for (let i = 0; i < gridWidth + 1; i++) {
  drawLine(A, B);
  A[0] += gapx;
  B[0] += gapx;
}

A = [5, height - 15];
B = [width - 5, height - 15];
//Draws rows
for (let i = 0; i < gridWidth + 1; i++) {
  drawLine(A, B);
  A[1] -= gapy;
  B[1] -= gapy;
}
//Completed inner grid


//Letter drawing
let alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet = alphabet.slice(0, gridWidth);

//height-15 = start of grid i think
X = 5 + gapx;
Y = height - 15 - gapy;

let xcp = gapx / 2 - scale; //X center padding
let ycp = gapy / 2 + scale * 2; //Y center padding

for (const letter of alphabet) { //draws letters
  drawLetter(letter, 5 + xcp, Y - ycp); //Draws the row letters
  Y -= gapy;
};

for (let i = 1; i < gridWidth + 1; i++) { //draws numbers
  drawLetter(i, X + xcp, height - 15 - ycp); //Draws the column letters
  X += gapx;
};

//Letters complete

//Drawing ships
function parseCoords(coords, vertex) { //Vertex is coords return value: tr, br, tl, bl (top-right, ... ,bottom-left, etc.)
  let letter = coords.split(':')[0]; //Assumes it is fail proof
  let number = coords.split(':')[1];
  //defaults to top left first and then modifies
  let x = gapx * number + 5;
  let y = height - 15 - gapy * (alphabet.indexOf(letter) + 1);
  switch (vertex) {
    case "tr":
      return [x + gapx, y];
    case "tl":
      return [x, y]; //default
    case "br":
      return [x + gapx, y - gapy];
    case "bl":
      return [x, y - gapy];
  };
}

//This is the actual "art" part
let tip = (coords, orientation) => { //The tip of the ship, coords: letter: a1, f10 ,orientation: l, r, u ,d
  const turtle = new bt.Turtle();
  let x; //starting x position
  let y; //starting y
  //**pivot will be bl when up
  let o = orientation == "l" ? "br" : (orientation == "r" ? "tl" : (orientation == "u" ? "bl" : "tr"));
  let highest = [0, 0]; //idk maybe this is useful
  [x, y] = parseCoords(coords, o);
  turtle.jump([x, y]);
  if (orientation == "l" || orientation == "r") {
    let theta = Math.atan((8 * gapx) / (5 * gapy)) * (180 / Math.PI);
    turtle.setAngle(orientation == "l" ? 180 : 0);
    turtle.right(90 - theta);
    turtle.forward((Math.sqrt(64 * (gapx ** 2) + 25 * (gapy ** 2))) / 10);
    highest = turtle.pos;
    turtle.right(2 * theta);
    turtle.forward((Math.sqrt(64 * (gapx ** 2) + 25 * (gapy ** 2))) / 10);
  } else {
    let theta = Math.atan((8 * gapy) / (5 * gapx)) * (180 / Math.PI);
    turtle.setAngle(orientation == "u" ? 90 : 270);
    turtle.right(90 - theta);
    turtle.forward((Math.sqrt(64 * (gapy ** 2) + 25 * (gapx ** 2))) / 10);
    highest = turtle.pos;
    turtle.right(2 * theta);
    turtle.forward((Math.sqrt(64 * (gapy ** 2) + 25 * (gapx ** 2))) / 10);
  }
  drawLines(turtle.lines());
};

let body = (coords1, coords2, orientation) => { //The body of the ship, takes in 2 positional params, orientation is either h(horizontal) or v (vertical)
  let x1, y1, x2, y2;
  [x1, y1] = parseCoords(coords1, "tl"); //coords1 > coords2 must be or else it wont rly work
  [x2, y2] = parseCoords(coords2, "br");
  let coords1des = coords1.split(':'); //Destructed coords1
  let coords2des = coords2.split(':');
  let length = orientation == "v" ? alphabet.indexOf(coords2des[0]) - alphabet.indexOf(coords1des[0]) : coords2des[1] - coords1des[1];
  //2 styles - big ship and small boat
  let body = [];
  let leftxoffset;
  //small boat
  if (length < 2) {
    if (orientation == "v") {
      let left = bt.catmullRom([
        [x1, y1],
        [x1 - gapx * 0.1, (y2 + y1) / 2],
        [x1, y2]
      ], 10);
      finalLines.push(left); //left side
      let right = bt.catmullRom([
        [x2, y1],
        [x2 + gapx * 0.1, (y2 + y1) / 2],
        [x2, y2]
      ], 10);
      finalLines.push(right); //right side
    } else {
      let left = bt.catmullRom([
        [x1, y1],
        [(x1 + x2) / 2, y1 + gapy * 0.1],
        [x2, y1]
      ], 10);
      finalLines.push(left); //left side
      let right = bt.catmullRom([
        [x1, y2],
        [(x1 + x2) / 2, y2 - gapy * 0.1],
        [x2, y2]
      ], 10);
      finalLines.push(right); //right side
    }
    let seat = [
      [x1 + gapx * 0.2, y1 - gapy * 0.2],
      [x2 - gapx * 0.2, y1 - gapy * 0.2],
      [x2 - gapx * 0.2, y2 + gapy * 0.2],
      [x1 + gapx * 0.2, y2 + gapy * 0.2],
      [x1 + gapx * 0.2, y1 - gapy * 0.2],
    ];
    let plank = orientation == "v" ? [
      [x1 + gapx * 0.2, y1 - gapy * 0.5],
      [x1 + gapx * 0.2, y1 - gapy * 0.8],
      [x1 + gapx * 0.8, y1 - gapy * 0.8],
      [x1 + gapx * 0.8, y1 - gapy * 0.5],
      [x1 + gapx * 0.2, y1 - gapy * 0.5],
    ] : [
      [x1 + gapx * 0.5, y1 - gapy * 0.2],
      [x1 + gapx * 0.8, y1 - gapy * 0.2],
      [x1 + gapx * 0.8, y1 - gapy * 0.8],
      [x1 + gapx * 0.5, y1 - gapy * 0.8],
      [x1 + gapx * 0.5, y1 - gapy * 0.2],
    ];
    finalLines.push(seat, plank);
  } else {
    if (orientation == "v") {
      let frame = [
        [x1, y1],
        [x2, y1],
        [x2+gapx*0.3, y1-gapy*0.1],
        [x2+gapx*0.3, y2+gapy*1.1],
        [x2, y2+gapy*0.3],
        [x1, y2+gapy*0.3],
        [x1-gapx*0.3, y2+gapy*1.1],
        [x1-gapx*0.3, y1-gapy*0.1],
        [x1, y1],
      ];
      let rear = [ //front thingy (I have no idea what a rear is but my gut tells me to name this thing a rear)
        [x1+gapx*0.1, y1-gapy*0.2],
        [x2-gapx*0.1, y1-gapy*0.2],
        [x2-gapx*0.1, y1-gapy*0.4],
        [x1+gapx*0.1, y1-gapy*0.4],
        [x1+gapx*0.1, y1-gapy*0.2],
      ];
      let rear2 = [
        [x1+gapx*0.35, y1-gapy*0.6],
        [x1+gapx*0.2, y1-gapy*0.7],
        [x1+gapx*0.2, y1-gapy*1.3],
        [x1+gapx*0.1, y1-gapy*1.6],
        [x1+gapx*0.3, y1-gapy*1.6],
        [x1+gapx*0.35, y1-gapy*1.45],
        [x2-gapx*0.35, y1-gapy*1.45],
        [x2-gapx*0.3, y1-gapy*1.6],
        [x2-gapx*0.1, y1-gapy*1.6],
        [x2-gapx*0.2, y1-gapy*1.3],
        [x2-gapx*0.2, y1-gapy*0.7],
        [x2-gapx*0.35, y1-gapy*0.6],
        [x1+gapx*0.35, y1-gapy*0.6],
      ]
      let rear2s = [
        [
          [x1+gapx*0.35, y1-gapy*0.8],
          [x2-gapx*0.35, y1-gapy*0.8],
          [x2-gapx*0.35, y1-gapy],
          [x1+gapx*0.35, y1-gapy],
          [x1+gapx*0.35, y1-gapy*0.8],
        ],
        [
          [x1+gapx*0.35, y1-gapy*1.1],
          [x2-gapx*0.35, y1-gapy*1.1],
          [x2-gapx*0.35, y1-gapy*1.2],
          [x1+gapx*0.35, y1-gapy*1.2],
          [x1+gapx*0.35, y1-gapy*1.1],
        ],
        [
          [x1+gapx*0.35, y1-gapy*1.25],
          [x2-gapx*0.35, y1-gapy*1.25],
          [x2-gapx*0.35, y1-gapy*1.35],
          [x1+gapx*0.35, y1-gapy*1.35],
          [x1+gapx*0.35, y1-gapy*1.25],
        ],
      ]
      let rear3 = [
        [x1+gapx*0.35, y1-gapy*1.7],
        [x2-gapx*0.35, y1-gapy*1.7],
        [x2-gapx*0.35,y1-gapy*(length+0.5)],
        [x1+gapx*0.35, y1-gapy*(length+0.5)],
        [x1+gapx*0.35, y1-gapy*1.7],
      ] //Bounds: x1+gapx*0.35 and y1-gapy*(length+0.5)
      let start = [x1+gapx*0.35, y1-gapy*1.7];
      let end = [x2-gapx*0.35, y1-gapy*1.7];
      const increment = ((y1-gapy*(length+0.5))-(y1-gapy*1.7))/20;
      for(let i = 0; i<20; i++){
        start[1] += increment;
        end[1] += increment;
        drawLine(start,end);
      }
      finalLines.push(frame, rear, rear2, rear2s[0], rear2s[1], rear2s[2], rear3);
    }
    else{ //for horizontal
     let frame = [
        [x1, y1],
        [x1, y2],
        [x1+gapx*0.1, y2-gapy*0.3],
        [x2-gapx*1.1, y2-gapy*0.3],
        [x2-gapx*0.3, y2],
        [x2-gapx*0.3, y1],
        [x2-gapx*1.1, y1+gapy*0.3],
        [x1+gapx*0.1, y1+gapy*0.3],
        [x1, y1],
      ];
    let rear = [ //front thingy (I have no idea what a rear is but my gut tells me to name this thing a rear)
      [x1+gapx*0.2,y1-gapy*0.1],
      [x1+gapx*0.2,y2+gapy*0.1],
      [x1+gapx*0.4,y2+gapy*0.1],
      [x1+gapx*0.4,y1-gapy*0.1],
      [x1+gapx*0.2,y1-gapy*0.1]
    ];
    let rear2 = [
      [x1+gapx*0.6,y1-gapy*0.35],
      [x1+gapx*0.7,y1-gapy*0.2], 
      [x1+gapx*1.3,y1-gapy*0.2], 
      [x1+gapx*1.6,y1-gapy*0.1], 
      [x1+gapx*1.6,y1-gapy*0.3], 
      [x1+gapx*1.45,y1-gapy*0.35],
      [x1+gapx*1.45,y2+gapy*0.35],
      [x1+gapx*1.6,y2+gapy*0.3], 
      [x1+gapx*1.6,y2+gapy*0.1], 
      [x1+gapx*1.3,y2+gapy*0.2], 
      [x1+gapx*0.7,y2+gapy*0.2], 
      [x1+gapx*0.6,y2+gapy*0.35],
      [x1+gapx*0.6,y1-gapy*0.35],
    ]
    let rear2s = [
      [
        [x1+gapx*0.8,y1-gapy*0.35],
        [x1+gapx*0.8,y2+gapy*0.35],
        [x1+gapx,y2+gapy*0.35],
        [x1+gapx,y1-gapy*0.35],
        [x1+gapx*0.8,y1-gapy*0.35],
      ],
      [
        [x1+gapx*1.1,y1-gapy*0.35], 
        [x1+gapx*1.1,y2+gapy*0.35], 
        [x1+gapx*1.2,y2+gapy*0.35], 
        [x1+gapx*1.2,y1-gapy*0.35], 
        [x1+gapx*1.1,y1-gapy*0.35], 
      ],
      [
        [x1+gapx*1.25,y1-gapy*0.35], 
        [x1+gapx*1.25,y2+gapy*0.35], 
        [x1+gapx*1.35,y2+gapy*0.35], 
        [x1+gapx*1.35,y1-gapy*0.35], 
        [x1+gapx*1.25,y1-gapy*0.35], 
      ],
    ]
    let rear3 = [
      [x1+gapx*1.7,y1-gapy*0.35],
      [x1+gapx*1.7,y2+gapy*0.35],
      [x1+gapx*(length + 0.5),y2+gapy*0.35],
      [x1+gapx*(length + 0.5),y1-gapy*0.35],
      [x1+gapx*1.7,y1-gapy*0.35],
    ]
    let start = [x1+gapx*1.7,y1-gapy*0.35];
    let end = [x1+gapx*1.7, y2+gapy*0.35];
    var increment = ((x1+gapx*(length + 0.5))-(x1+gapx*1.7))/20;
    for(let i = 0; i<20; i++){
      start[0] += increment;
      end[0] += increment;
      drawLine(start,end);
    }
    finalLines.push(frame, rear, rear2, rear2s[0], rear2s[1], rear2s[2], rear3);
  };
  }
};

let occupied = [];
if (!empty) { //Checks if the player wants an empty sheet or not
  tip("c:5", "r");
  tip("c:2", "l");
  body("c:3", "c:4", "h");
  tip("e:2","u");
  body("f:2","f:2","v");
  tip("e:7","u");
  body("f:7","j:7","v")
  tip("a:1","l");
  body("a:2","a:4","h")
}

//End of drawing ships

finalLines.push(mainframe);

drawLines(finalLines);