let inventory = JSON.parse(localStorage.getItem("inventory"));

if (!inventory) {
  inventory = [
    { name: "Brake Chambers", quantity: 10 },
    { name: "Air Fittings", quantity: 10 },
    { name: "Brake Pads", quantity: 10 },
    { name: "Brake Drums", quantity: 10 },
    { name: "Oil Filters", quantity: 10 }
  ];
  saveInventory();
}

function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function renderInventory() {
  const table = document.getElementById("inventoryTable");
  table.innerHTML = "";

  inventory.forEach((item, index) => {
    const statusClass = item.quantity <= 3 ? "low" : "ok";
    const statusText = item.quantity <= 3 ? "LOW STOCK" : "IN STOCK";

    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>
          <button class="minus" onclick="adjustQuantity(${index}, -1)">-</button>
          <button class="plus" onclick="adjustQuantity(${index}, 1)">+</button>
        </td>
        <td class="${statusClass}">${statusText}</td>
      </tr>
    `;
  });
}

function adjustQuantity(index, amount) {
  inventory[index].quantity += amount;

  if (inventory[index].quantity < 0) {
    inventory[index].quantity = 0;
  }

  saveInventory();
  renderInventory();
}

renderInventory();
