function addRow() {
  var tbody = document.querySelector("#myTable tbody");
  var newRow = document.createElement("tr");
  var thCell = document.createElement("th");
  thCell.setAttribute("scope", "row");
  thCell.textContent = tbody.children.length + 1;
  newRow.appendChild(thCell);

  for (var i = 0; i < 7; i++) {
    var tdCell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "10");
    var id = "" + (tbody.children.length + 1) + (i + 1);
    input.setAttribute("id", id);
    tdCell.appendChild(input);
    newRow.appendChild(tdCell);
  }

  tbody.appendChild(newRow);
}

function deleteLastRow() {
  var table = document.getElementById("myTable");
  var rowCount = table.rows.length;

  if (rowCount > 1) {
    table.deleteRow(rowCount - 1);
  } else {
    alert("Tabloda silinecek satır bulunmamaktadır.");
  }
}

function showResult() {
  var table = document.getElementById("myTable");
  var lastRow = table.rows[table.rows.length - 1];
  var result = "";

  for (var i = 1; i < lastRow.cells.length; i++) {
    var inputValue = lastRow.cells[i].querySelector("input").value;
    result += lastRow.cells[i].textContent + ": " + inputValue + ", ";
  }

  document.getElementById("output").innerText = result.slice(0, -2);
}

function removeResult() {
  document.getElementById("output").innerText = "";
  window.location.reload();
}

function showValue(newValue, elementId) {
  document.getElementById(elementId).innerText = newValue;
}
