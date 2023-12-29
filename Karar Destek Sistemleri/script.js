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

  if (deger == 1 || (deger > 0.9 && deger < 1.1)) {
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
    var toplamAgirlikDizisi = [];
    var toplamAgirlikDizisi2 = [];
    var toplamdegerler = [];
    var toplamdegerler2 = [];
    // Sütun toplamlarını kullanarak işlemleri yap
    for (var k = 0; k < sutunToplamlari.length; k++) {
      sutunToplamlari[k] = Math.sqrt(sutunToplamlari[k]);

      // En yüksek weightedValue'ı saklamak için değişken tanımla
      var sutunenyuksekdeger = 0;
      var sutunendusukdeger = Number.MAX_VALUE;
      var enYuksekDegerler = [];
      var enDusukDegerler = [];
      var agirlik = [];
      var agirlik2 = [];
      // Her sütunun ilk hücresine bölme işlemi
      for (var m = 1; m < table.rows.length; m++) {
        var inputValue = parseFloat(
          table.rows[m].cells[k + 1].querySelector("input").value
        );

        // Kontrol: Geçerli bir sayı mı? ve sütun toplamı sıfırdan farklı mı?
        if (!isNaN(inputValue) && sutunToplamlari[k] !== 0) {
          // Her satırdaki değeri sütun toplamına böl
          var normalizedValue = inputValue / sutunToplamlari[k];
          // Her bir sütunu range değeriyle çarp
          var weightedValue =
            normalizedValue *
            [range1, range2, range3, range4, range5, range6, range7][k];

          agirlik.push(weightedValue);
          agirlik2.push(weightedValue);
          // En yüksek weightedValue'ı güncelle
          sutunenyuksekdeger = Math.max(sutunenyuksekdeger, weightedValue);
          sutunendusukdeger = Math.min(sutunendusukdeger, weightedValue);
          enYuksekDegerler.push(sutunenyuksekdeger);
          enDusukDegerler.push(sutunendusukdeger);
          // Sonucu yazdır veya başka bir şey yap
          console.log(
            `Sütun ${
              k + 1
            }, Satır ${m} Normalize Değer: ${weightedValue} Negatif Değer: ${sutunendusukdeger} Pozitif değer: ${sutunenyuksekdeger}`
          );
        }
      }
      enYuksekDegerler = Math.max(...enYuksekDegerler);
      enDusukDegerler = Math.min(...enDusukDegerler);
      console.log(
        `enyüksek değer: ${enYuksekDegerler} en düşük değer: ${enDusukDegerler} ağırlık : ${agirlik}`
      );
      var agirlikdizi = [];
      for (var n = 0; n < agirlik.length; n++) {
        agirlik[n] -= enYuksekDegerler;
        agirlik[n] = Math.pow(agirlik[n], 2);
        agirlikdizi.push(agirlik[n]);
      }
      toplamAgirlikDizisi.push(agirlikdizi);

      var agirlikdizi2 = [];
      for (var n = 0; n < agirlik2.length; n++) {
        agirlik2[n] -= enDusukDegerler;
        agirlik2[n] = Math.pow(agirlik2[n], 2);
        agirlikdizi2.push(agirlik2[n]);
      }
      toplamAgirlikDizisi2.push(agirlikdizi2);

      // Ağırlık dizisini consola yazdır
      console.log(
        "Toplam Ağırlık dizisi: ",
        toplamAgirlikDizisi,
        "Toplam Ağırlık dizisi2 : ",
        toplamAgirlikDizisi2
      );
    }

    for (var l = 0; l < toplamAgirlikDizisi[0].length; l++) {
      var toplam = 0;

      for (var r = 0; r < toplamAgirlikDizisi.length; r++) {
        toplam += toplamAgirlikDizisi[r][l];
      }
      var toplamkok = Math.sqrt(toplam);
      toplamdegerler.push(toplamkok);
    }

    for (var l = 0; l < toplamAgirlikDizisi2[0].length; l++) {
      var toplam = 0;

      for (var r = 0; r < toplamAgirlikDizisi2.length; r++) {
        toplam += toplamAgirlikDizisi2[r][l];
      }
      var toplamkokeksi = Math.sqrt(toplam);
      toplamdegerler2.push(toplamkokeksi);
    }
    console.log(
      "Final Değerler:",
      toplamdegerler,
      "Final Değerler2:",
      toplamdegerler2
    );
    var finalci = [];
    finalci.push(toplamdegerler, toplamdegerler2);
    console.log("Finalci ", finalci);

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
