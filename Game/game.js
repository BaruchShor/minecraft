const grid = document.getElementById("gameGrid");
const tools = document.querySelectorAll(".tool");
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

function eraseWorld() {
  Array.from(grid.children).forEach((child) => {
    if (child.className && child.className.includes("gridItem")) {
      grid.removeChild(child);
    }
  });

  for (let tileType in tileInventory) {
    tileInventory[tileType] = 0;
  }

  const existingTilesInStorage = document.querySelectorAll(".tile_storage");
  existingTilesInStorage.forEach((tile) => {
    tile.parentElement.remove();
  });
}

function WorldBuilding() {
  eraseWorld();
  for (let i = 0; i <= 1199; i++) {
    const card = document.createElement("section");
    card.className = "sky gridItem";
    grid.append(card);
  }

  console.log(`hi`);

  for (let i = 0; i <= 99; i++) {
    const card = document.createElement("section");
    card.className = "ground gridItem";
    grid.append(card);
  }

  for (let i = 0; i <= 599; i++) {
    const card = document.createElement("section");
    card.className = "dirt gridItem";
    grid.append(card);
  }

  for (let i = 0; i <= 1599; i++) {
    const card = document.createElement("section");
    card.className = "stone gridItem";
    grid.append(card);
  }

  for (let i = 0; i <= 499; i++) {
    const card = document.createElement("section");
    card.className = "bedrock gridItem";
    grid.append(card);
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
  console.log(`target class name`, targetClass);

  if (selectedCursor.type !== undefined) {
    if (selectedCursor.type.includes("tool")) {
      if (selectedCursor.name === "pickaxe" && targetClass.includes("stone")) {
        e.target.className = "sky gridItem";
        updateInventory("stone");
      }

      if (selectedCursor.name === "axe" && targetClass.includes("log")) {
        e.target.className = "sky gridItem";
        updateInventory("log");
      }

      if (selectedCursor.name === "shears" && targetClass.includes("leave")) {
        e.target.className = "sky gridItem";
        updateInventory("leave");
      }

      if (
        selectedCursor.name === "shovel" &&
        (targetClass.includes("ground") || targetClass.includes("dirt"))
      ) {
        e.target.className = "sky gridItem";
        if (targetClass.includes("ground")) {
          updateInventory("ground");
        } else {
          updateInventory("dirt");
        }
      }

      if (selectedCursor.name === "stone" && targetClass.includes("stone")) {
        e.target.className = "sky gridItem";
        updateInventory("stone");
      }
    }

    if (selectedCursor.type.includes("tile_storage")) {
      const tileType = selectedCursor.name;
      if (tileInventory[tileType] > 0 && targetClass.includes("sky")) {
        e.target.className = tileType + " gridItem";
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
    const tileImg = document.createElement("img");
    tileImg.className = "tile_storage";
    tileImg.id = tileType;
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
        src = "../Images/ground.png";
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
    tileImg.src = src;
    tileImg.alt = "";
    section.appendChild(tileImg);
    // Add quantity
    const count = document.createElement("section");
    count.className = "quantity";
    count.textContent = tileInventory[tileType];
    section.appendChild(count);
    inventory.appendChild(section);

    tileImg.addEventListener("click", () => {
      //let count = img.parentElement.querySelector(".quantity").textContent;
      document
        .querySelectorAll(".tile_storage")
        .forEach((t) => t.classList.remove("selected"));

      tileImg.classList.add("selected");
      if (tileImg.id) {
        changeCursor(tileImg);
      }
    });
  }
}

//WorldBuilding();
document.addEventListener("DOMContentLoaded", WorldBuilding);

newWorld.addEventListener("click", () => {
  console.log(`new world btn clicked`);
  WorldBuilding();
});
