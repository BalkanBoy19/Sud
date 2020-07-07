var breite = 270;

var hoehe = 270;
var backgroundColor = 0;/*
var board = [
 ["","","","","","","","",""],
 ["","","","","",3,"",8,5],
 ["","",1,"",2,"","","",""],
 ["","","",5,"",7,"","",""],
 ["","",4,"","","",1,"",""],
 ["",9,"","","","","","",""],
 [5,"","","","","","",7,3],
 ["","",2,"",1,"","","",""],
 ["","","","",4,"","","",9],
];*/
var board = [
 ["5","3",0,0,"7",0,0,0,0],
 ["6",0,0,"1","9","5",0,0,0],
 [0,"9","8",0,0,0,0,"6",0],
 ["8",0,0,0,"6",0,0,0,"3"],
 ["4",0,0,"8",0,"3",0,0,"1"],
 ["7",0,0,0,"2",0,0,0,"6"],
 [0,"6",0,0,0,0,"2","8",0],
 [0,0,0,"4","1","9",0,0,"5"],
 [0,0,0,0,"8",0,0,"7","9"]
];
/*
var board = [
 [5,3,0,0,7,0,0,0,0],
 [6,0,0,1,9,5,0,0,0],
 [0,9,8,0,0,0,0,6,0],
 [8,0,0,0,6,0,0,0,3],
 [4,0,0,8,0,3,0,0,1],
 [7,0,0,0,2,0,0,0,6],
 [0,6,0,0,0,0,2,8,0],
 [0,0,0,4,1,9,0,0,5],
 [0,0,0,0,8,0,0,7,9]
];
*/
var available = [];

function setup() {
  createCanvas(400,400);
  background(backgroundColor);
  for (var i = 0; i < 9; i++) {
   for (var j = 0; j < 9; j++) {
    available.push([i,j]);
   }
  }
}

function draw() {
  fill(255,255,255);
  rect(0,0,breite,hoehe);
  linie = breite/9;
  for(var i = 0; i < 9; i++) {    // voraussgesetzt dass hoehe = breite
    stroke(200,200,200);
    if (i%3 === 0) {
     stroke(0,0,0);
    }
  line(i*linie, 0, i*linie, hoehe);  // vertikale Linie
  line(0, i*linie, breite, i*linie); // horizontal Linie

  }

  textSize(20);
  fill(0,0,0);

  for (var i = 0; i < 9; i++) {
   for (var j = 0; j < 9; j++) {
    if (board[j][i] !== 0) {
      text(board[j][i], 15*(2*i+1)-5, 15*(2*j+1)+5);
    }
   }
  }
}

function isValid(x, y, number) {  // Position statt Number (macht es einfacher)
  if (typeof board[x][y] == "number") {
   for (var i = 0; i < 9; i++) {
      if (board[x][i] == number && i != y) {
        return false;
      } else if (board[i][y] == number && x != i) {
        return false;
      } else if (isNotValidInSquare(x, y, number)) {
        return false;
      }
    }
 }
 return true;
}

// Vielleicht Lösung; Memoization, sodass
// Rekursionen gemerkt werden können

function isSolved() {
 for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
   if (board[i][j] == 0) {
     return false;
   }
  }
 }
 return true;
}

function mousePressed() {
 solve(board, 0, 0);  // bei Feld (0, 0) anfangen
}

var vorwaerts = true;

function solve(board, i, j) {
  if (isSolved()) {
   print("SOLVED");
   return;
  }
  if (i == 8 && j == 8) {
    return;
  }

  if (j == 9) {
    ++i;
    j = 0;
  } else if (j == -1) {
    --i;
    j = 8;
  }

  while (typeof board[i][j] == "string") {
    if (vorwaerts) {
      ++j;
    } else {
      --j;
    }
    if (j == 9) {
      ++i;
      j = 0;
    } else if (j == -1) {
      --i;
      j = 8;
    }
  }
  if (typeof board[i][j] == "number") { // Nur beachten wenn Zahl sowieso nicht schon richtig (wenn selbst eingetragen im Array)
   for (var number = board[i][j]+1; number <= 9; number++) {
    if (isValid(i, j, number)) {
     board[i][j] = number;
     vorwaerts = true;
     return solve(board, i, j+1);
    }
   }
     board[i][j] = 0;  // aktuellen Wert resetten (wichtig!)
     vorwaerts = false;
     return solve(board, i, j-1);
   }
}

function isNotValidInSquare(x, y, number) {
  var temp_x = x%3;
  var temp_y = y%3;
  for(var i = 0; i <= 2; i++) {
   for(var j = 0; j <= 2; j++) {
    if (board[x - temp_x + i][y - temp_y + j] == number) {
      return true;
    }
   }
  }
 return false;
}

function isItemInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] == item[0] && array[i][1] == item[1]) {
     return i;
    }
  }
}
