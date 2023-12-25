// Satır Ekle
function addRow() {
  var tbody = document.querySelector("#myTable tbody");
  var yenisatir = document.createElement("tr");
  var yenith = document.createElement("th");
  yenith.textContent = tbody.children.length + 1;
  yenisatir.appendChild(yenith);

  for (var i = 0; i < 7; i++) {
    var yenitd = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    var id = "" + (tbody.children.length + 1) + (i + 1);
    input.setAttribute("id", id);
    yenitd.appendChild(input);
    yenisatir.appendChild(yenitd);
  }

  tbody.appendChild(yenisatir);
}

// Satır Silme Butonu
function deleteLastRow() {
  var tablo = document.getElementById("myTable");
  var satirsayisi = tablo.rows.length;

  if (satirsayisi > 1) {
    tablo.deleteRow(satirsayisi - 1);
  } else {
    alert("Tabloda silinecek satır bulunmamaktadır.");
  }
}

// Range Değerler
function showValue(newValue, elementId) {
  document.getElementById(elementId).innerText = newValue;
}

// Sonucu Göster Butonu
function showResult() {
  var table = document.getElementById("myTable");
  var lastRow = table.rows[table.rows.length - 1];
  var result = "";

  var range1 = document.getElementById("form1").value;
  var range2 = document.getElementById("form2").value;
  var range3 = document.getElementById("form3").value;
  var range4 = document.getElementById("form4").value;
  var range5 = document.getElementById("form5").value;
  var range6 = document.getElementById("form6").value;
  var range7 = document.getElementById("form7").value;
  var deger =
    parseFloat(range1) +
    parseFloat(range2) +
    parseFloat(range3) +
    parseFloat(range4) +
    parseFloat(range5) +
    parseFloat(range6) +
    parseFloat(range7);

  if (deger == 1) {
    for (var i = 1; i < lastRow.cells.length; i++) {
      var inputValue = lastRow.cells[i].querySelector("input").value;
      result += lastRow.cells[i].textContent + ": " + inputValue + ", ";
    }

    document.getElementById("output").innerText = result.slice(0, -2);
  } else {
    alert("Lütfen Önem Derecelerinin toplam değerini 1 olarak ayarlayınız.");
  }
}

// Sonuçları Sıfırla Butonu
function removeResult() {
  document.getElementById("output").innerText = "";
  window.location.reload();
}
