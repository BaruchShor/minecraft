const grid = document.getElementById("gameGrid");

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
