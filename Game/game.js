const grid = document.getElementById("gameGrid");
const tools = document.querySelectorAll(".tool");
const cols = 100;
const tilesInStorage = document.querySelectorAll(".tile_storage");

for (let i = 0; i <= 1199; i++) {
  const card = document.createElement("section");
  card.className = "sky";
  grid.append(card);
}

for (let i = 0; i <= 99; i++) {
  const card = document.createElement("section");
  card.className = "ground";
  grid.append(card);
}

for (let i = 0; i <= 599; i++) {
  const card = document.createElement("section");
  card.className = "dirt";
  grid.append(card);
}

for (let i = 0; i <= 1599; i++) {
  const card = document.createElement("section");
  card.className = "stone";
  grid.append(card);
}

for (let i = 0; i <= 499; i++) {
  const card = document.createElement("section");
  card.className = "bedroce";
  grid.append(card);
}

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tools.forEach((t) => t.classList.remove("selected"));

    tool.classList.add("selected");

    const img = tool;

    if (img.id) {
      changeCursor(img.id);
    }
  });
});

tilesInStorage.forEach((tile) => {
  tile.addEventListener("click", () => {
    tilesInStorage.forEach((t) => t.classList.remove("selected"));

    tile.classList.add("selected");

    const img = tile;

    if (img.id) {
      changeCursor(img.id);
    }
  });
});

// function to change cursor by chosen item
function changeCursor(img) {
  if (img) {
    document.body.style.cursor = "url(../cursors/" + img + ".cur) 16 16 , auto";
  } else {
    document.body.style.cursor = "auto";
  }
}

function getColForTry() {
  return Math.floor(Math.random() * 86) + 15;
}

function getTrysHeight() {
  return Math.floor(Math.random() * 5) + 3;
}

const cells = document.querySelectorAll("#gameGrid section");

function createTry() {
  let numCol;
  let index;
  let numRow = 11;
  do {
    numCol = getColForTry();
    index = numRow * 100 + numCol;
  } while (
    cells[index].className === "log" ||
    cells[index + 1].className === "log" ||
    cells[index - 1].className === "log"
  );
  const height = getTrysHeight();
  for (let i = 0; i < height - 1; i++) {
    cells[index].className = "log";
    numRow -= 1;
    index = numRow * 100 + numCol;
  }
  numCol -= 3;
  numRow += 1;
  let loop = 7;
  for (let j = 0; j < 3; j++) {
    for (let loopForRow = 0; loopForRow < 2; loopForRow++) {
      for (let width = 0; width < loop; width++) {
        index = numRow * 100 + numCol;
        cells[index].className = "leave";
        numCol++;
        if (j == 0 && loopForRow == 0 && width == 2) {
          numCol++;
          width++;
        }
      }
      numCol -= loop;
      numRow -= 1;
    }
    loop -= 2;
    numCol += 1;
  }
}

for (let i = 0; i < 10; i++) {
  createTry();
}
