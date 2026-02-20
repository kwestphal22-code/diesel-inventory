let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function renderInventory() {
  const table = document.getElementById("inventoryTable");
  table.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.supplier}</td>
        <td class="${item.quantity <= 5 ? 'low' : ''}">
          ${item.quantity <= 5 ? 'LOW STOCK' : 'OK'}
        </td>
        <td><button onclick="deletePart(${index})">X</button></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function addPart() {
  const name = document.getElementById("partName").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const supplier = document.getElementById("supplier").value;

  if (!name || !quantity || !supplier) {
    alert("Fill out all fields");
    return;
  }

  inventory.push({ name, quantity, supplier });
  saveInventory();
  renderInventory();

  document.getElementById("partName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("supplier").value = "";
}

function deletePart(index) {
  inventory.splice(index, 1);
  saveInventory();
  renderInventory();
}

renderInventory();
