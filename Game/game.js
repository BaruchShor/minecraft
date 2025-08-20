const grid = document.getElementById("gameGrid");
console.log(`grid`, grid);
const tools = document.querySelectorAll(".tool");
const tilesInStorage = document.querySelectorAll(".tile_storage");
console.log(`tilesInStorage`, tilesInStorage);

let selectedCursor = {};

const tileInventory = {
  dirt: 0,
  ground: 0,
  stone: 0,
  log: 0,
  leave: 0,
};

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

// tilesInStorage.forEach((tile) => {
//   tile.addEventListener("click", () => {
//     let count = tile.parentElement.querySelector(".quantity").textContent;
//     console.log(`count:`, count);

//     tilesInStorage.forEach((t) => t.classList.remove("selected"));
//     tile.classList.add("selected");

//     if (!count) {
//     }

//     const img = tile;
//     if (img.id) {
//       changeCursor(img.id);
//     }
//   });
// });

// function to change cursor by chosen item
function changeCursor(img) {
  if (img) {
    document.body.style.cursor =
      "url(../cursors/" + img.id + ".cur) 16 16 , auto";
    selectedCursor.name = img.id;
    selectedCursor.type = img.className;
    console.log(`selectedCursor`, selectedCursor);
  } else {
    document.body.style.cursor = "auto";
  }
}

grid.addEventListener("click", (e) => {
  const targetClass = e.target.className;
  console.log(targetClass);
  if (selectedCursor.type.includes("tool")) {
    if (selectedCursor.name === "pickaxe" && targetClass === "stone") {
      e.target.className = "sky";
      //tileInventory.stone += 1;
      updateInventory("stone");
    }

    if (selectedCursor.name === "axe" && targetClass === "log") {
      e.target.className = "sky";
      //tileInventory.stone += 1;
      updateInventory("log");
    }

    if (selectedCursor.name === "shears" && targetClass === "leave") {
      e.target.className = "sky";
      //tileInventory.stone += 1;
      updateInventory("leave");
    }

    if (
      selectedCursor.name === "shovel" &&
      (targetClass === "ground" || targetClass === "dirt")
    ) {
      e.target.className = "sky";
      //tileInventory.stone += 1;
      updateInventory(targetClass);
    }

    if (selectedCursor.name === "stone" && targetClass === "stone") {
      e.target.className = "sky";
      //tileInventory.stone += 1;
      updateInventory("stone");
    }
  }
  if (selectedCursor.type.includes("tile_storage")) {
    // Place the selected tile if available in inventory
    const tileType = selectedCursor.name;
    if (tileInventory[tileType] > 0 && targetClass === "sky") {
      e.target.className = tileType;
      tileInventory[tileType] -= 1;

      // Update quantity in inventory UI
      const existingTile = document.getElementById(tileType);
      if (existingTile) {
        let count = existingTile.parentElement.querySelector(".quantity");
        if (count) {
          count.textContent = tileInventory[tileType];
        }
        // Optionally, remove from inventory if count is 0
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
    console.log(count.textContent);
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
      case "grass":
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

    // Add event listener for new tile
    img.addEventListener("click", () => {
      let count = img.parentElement.querySelector(".quantity").textContent;
      console.log(`count:`, count);
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
