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
  var goster = document.getElementById("alt-kart1");
  var goster2 = document.getElementById("alt-kart2");

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
    goster.style.display = "flex";
    goster2.style.display = "inline-block";

    // Önce sutunToplamlari dizisini tanımla
    var sutunToplamlari = new Array(table.rows[0].cells.length - 1).fill(0);

    // Her bir hücredeki değeri al ve sütun toplamlarını hesapla
    for (var i = 1; i < table.rows.length; i++) {
      for (var j = 1; j < table.rows[0].cells.length; j++) {
        var inputValue = parseFloat(
          table.rows[i].cells[j].querySelector("input").value
        );
        sutunToplamlari[j - 1] += Math.pow(inputValue, 2);
      }
    }

    // Sütun toplamlarını kullanarak işlemleri yap
    for (var k = 0; k < sutunToplamlari.length; k++) {
      sutunToplamlari[k] = Math.sqrt(sutunToplamlari[k]);

      // Her sütunun ilk hücresine bölme işlemi
      for (var m = 1; m < table.rows.length; m++) {
        var inputValue = parseFloat(
          table.rows[m].cells[k + 1].querySelector("input").value
        );

        // Kontrol: Geçerli bir sayı mı? ve sütun toplamı sıfırdan farklı mı?
        if (!isNaN(inputValue) && sutunToplamlari[k] !== 0) {
          // Her satırdaki değeri sütun toplamına böl
          var normalizedValue = inputValue / sutunToplamlari[k];
          var agirlik =
            normalizedValue *
            // Sonucu yazdır veya başka bir şey yap
            console.log(
              `Sütun ${k + 1}, Satır ${m} Normalize Değer: ${normalizedValue}`
            );
        }
      }
    }

    // Sütun toplamlarını yazdır
    var sutunToplamText = "Sütun Toplamları: ";
    for (var k = 0; k < sutunToplamlari.length; k++) {
      sutunToplamText += `S${k + 1}: ${sutunToplamlari[k].toFixed(2)}   `;
    }

    document.querySelector("#alt-kart1 .card-text").textContent =
      sutunToplamText;
    document.querySelector("#alt-kart2 .card-text").textContent =
      "En Kötü Sonuç";
  } else {
    alert("Lütfen Önem Derecelerinin toplam değerini 1 olarak ayarlayınız.");
  }
}

// Sonuçları Sıfırla Butonu
function removeResult() {
  window.location.reload();
}
