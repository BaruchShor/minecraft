const grid = document.getElementById("gameGrid");
console.log(`grid`, grid);
const tools = document.querySelectorAll(".tool");
const tilesInStorage = document.querySelectorAll(".tile_storage");
let selectedTool = null;

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
    selectedTool = tool.id;
    console.log(`selected tool:`, selectedTool);

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

grid.addEventListener("click", (e) => {
  const targetClass = e.target.className;
  console.log(targetClass);
  if (selectedTool === "pickaxe" && targetClass === "stone") {
    e.target.className = "sky";
    tileInventory.stone += 1;
  }

  if (selectedTool === "axe" && targetClass === "log") {
    e.target.className = "sky";
    tileInventory.stone += 1;
  }

  if (selectedTool === "shears" && targetClass === "leave") {
    e.target.className = "sky";
    tileInventory.stone += 1;
  }

  if (
    selectedTool === "shovel" &&
    (targetClass === "ground" || targetClass === "dirt")
  ) {
    e.target.className = "sky";
    tileInventory.stone += 1;
  }

  if (selectedTool === "stone" && targetClass === "stone") {
    e.target.className = "sky";
    tileInventory.stone += 1;
  }
});

function updateInventory(tileType) {}
