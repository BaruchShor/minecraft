const grid = document.getElementById("gameGrid");
const tools = document.querySelectorAll(".tool");
const cols = 100;
const tilesInStorage = document.querySelectorAll(".tile_storage");
const newWorld = document.getElementById("newWorld");

let selectedCursor = {};

const tileInventory = {
  dirt: 0,
  ground: 0,
  stone: 0,
  log: 0,
  leave: 0,
};

function WorldBuilding() {
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
    card.className = "bedrock";
    grid.append(card);
  }

  for (let i = 0; i < 10; i++) {
    createTry();
  }

  tools.forEach((tool) => {
    tool.addEventListener("click", () => {
      tools.forEach((t) => t.classList.remove("selected"));

      tool.classList.add("selected");
      const img = tool;
      if (img.id) {
        changeCursor(img);
      }
    });
  });
}

newWorld.addEventListener("click", WorldBuilding);

// function to change cursor by chosen item
function changeCursor(img) {
  if (img) {
    document.body.style.cursor =
      "url(../cursors/" + img.id + ".cur) 16 16 , auto";
    selectedCursor.name = img.id;
    selectedCursor.type = img.className;
  } else {
    document.body.style.cursor = "auto";
  }
}

grid.addEventListener("click", (e) => {
  const targetClass = e.target.className;
  if (selectedCursor.type.includes("tool")) {
    if (selectedCursor.name === "pickaxe" && targetClass === "stone") {
      e.target.className = "sky";
      updateInventory("stone");
    }

    if (selectedCursor.name === "axe" && targetClass === "log") {
      e.target.className = "sky";
      updateInventory("log");
    }

    if (selectedCursor.name === "shears" && targetClass === "leave") {
      e.target.className = "sky";
      updateInventory("leave");
    }

    if (
      selectedCursor.name === "shovel" &&
      (targetClass === "ground" || targetClass === "dirt")
    ) {
      e.target.className = "sky";
      updateInventory(targetClass);
    }

    if (selectedCursor.name === "stone" && targetClass === "stone") {
      e.target.className = "sky";
      updateInventory("stone");
    }
  }
  if (selectedCursor.type.includes("tile_storage")) {
    const tileType = selectedCursor.name;
    if (tileInventory[tileType] > 0 && targetClass === "sky") {
      e.target.className = tileType;
      tileInventory[tileType] -= 1;

      const existingTile = document.getElementById(tileType);
      if (existingTile) {
        let count = existingTile.parentElement.querySelector(".quantity");
        if (count) {
          count.textContent = tileInventory[tileType];
        }
        if (tileInventory[tileType] === 0) {
          existingTile.parentElement.remove();
          document.body.style.cursor = "auto";
        }
      }
    }
  }
});

function updateInventory(tileType) {
  tileInventory[tileType] += 1;
  const existingTile = document.getElementById(tileType);
  if (existingTile) {
    let count = existingTile.parentElement.querySelector(".quantity");
    if (!count) {
      count = document.createElement("section");
      count.className = "quantity";
      existingTile.parentElement.appendChild(count);
    }
    count.textContent = tileInventory[tileType];
  } else {
    // Add new tile image to inventory
    const inventory = document.getElementById("inventory");
    const section = document.createElement("section");
    section.className = "inventory_item";
    const img = document.createElement("img");
    img.className = "tile_storage";
    img.id = tileType;
    // Set src based on tileType
    let src = "";
    switch (tileType) {
      case "stone":
        src = "../Images/bedrock.png";
        break;
      case "log":
        src = "../Images/oak-log.png";
        break;
      case "ground":
        src = "../Images/grass.png";
        break;
      case "dirt":
        src = "../Images/dirt.png";
        break;
      case "leave":
        src = "../Images/oak-leaves.png";
        break;
      default:
        src = "";
    }
    img.src = src;
    img.alt = "";
    section.appendChild(img);
    // Add quantity
    const count = document.createElement("section");
    count.className = "quantity";
    count.textContent = tileInventory[tileType];
    section.appendChild(count);
    inventory.appendChild(section);

    img.addEventListener("click", () => {
      let count = img.parentElement.querySelector(".quantity").textContent;
      document
        .querySelectorAll(".tile_storage")
        .forEach((t) => t.classList.remove("selected"));

      img.classList.add("selected");
      if (img.id) {
        changeCursor(img);
      }
    });
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
  console.log("Hello world");
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

WorldBuilding();
