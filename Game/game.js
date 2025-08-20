const grid = document.getElementById("gameGrid");
const gridW = 100;
const gridH = 30;

for (let i = 0; i <gridW * gridH; i++) {
  const card = document.createElement("section");
  grid.append(card);
}

// for (let i = 0; i <= 11000; i++) {
//   const card = document.createElement("section");
//   grid.append(card);
// }

const allCells = document.querySelectorAll("#gameGrid section");

// allCells.forEach((cell, index) => {
//   if (index < 1008) {        // רק התאים עם אינדקס 0 עד 99
//     cell.style.backgroundColor = "red";
//   }
// });

function createTree(x, y){
  
}
