const grid = document.getElementById("gameGrid");
const tools = document.querySelectorAll(".tool");
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
