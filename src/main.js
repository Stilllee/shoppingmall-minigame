// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Creates HTML element from given item
function createElement(item) {
  const img = document.createElement("img");
  img.setAttribute("class", "thumbnail");
  img.setAttribute("src", item.image);

  const span = document.createElement("span");
  span.setAttribute("class", "description");
  span.innerText = `${item.gender}, ${item.size} size`;

  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.setAttribute("data-type", item.type);
  li.setAttribute("data-color", item.color);
  li.append(img);
  li.append(span);

  return li;
}

// Handle button click
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

// Update the all items to be visible.
function showAllItems(items) {
  items.forEach((item) => item.classList.remove("invisible"));
}

loadItems()
  .then((items) => {
    const elements = items.map(createElement);
    const container = document.querySelector(".items");
    container.append(...elements);
    const buttons = document.querySelector(".buttons");
    buttons.addEventListener("click", (event) =>
      onButtonClick(event, elements)
    );

    const logo = document.querySelector(".logo");
    logo.addEventListener("click", () => showAllItems(elements));

    if (container.scrollHeight > container.clientHeight) {
      container.classList.add("scrollable");
    }
  })
  .catch(console.log);
