const mysql = require("mysql");

// Veritabanı bağlantısı
const connection = mysql.createConnection({
  host: "localhost", // MySQL sunucu adresi
  user: "root", // MySQL kullanıcı adı
  password: "huseyin6161", // MySQL şifre
  database: "karar_destek", // Kullandığınız veritabanı adı
});

// Bağlantıyı açma
connection.connect();

// Tabloyu oluşturma
const createTableQuery = `
CREATE TABLE IF NOT EXISTS sehirler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(50) NOT NULL,
    ulasim_maliyeti INT,
    ulasim_suresi INT,
    konaklama_maliyeti INT,
    konaklama_suresi INT,
    merkeze_uzaklik INT,
    degerlendirme_puani FLOAT,
    hava_sicakligi INT
);
`;

connection.query(createTableQuery, (error, results, fields) => {
  if (error) throw error;
  console.log("Tablo oluşturuldu.");
});

// Veri ekleme
const insertDataQuery = `
INSERT INTO sehirler (adi, ulasim_maliyeti, ulasim_suresi, konaklama_maliyeti, konaklama_suresi, merkeze_uzaklik, degerlendirme_puani, hava_sicakligi)
VALUES 
('İlk Seçim', 1200, 440, 10, 3, 10, 8.5, 9),
('İkinci Seçim', 1380, 480, 10, 5, 15, 6.3, 13),
('Üçüncü Seçim', 1450, 530, 10, 3, 8, 5.4, 13),
('Dördüncü Seçim', 1030, 350, 10, 4, 3, 7, 17),
('Beşinci Seçim', 1470, 480, 10, 4, 11, 3.7, 15),
('Altıncı Seçim', 1520, 600, 10, 3, 5, 6.8, 20),
('Yedinci Seçim', 950, 180, 30, 5, 7, 8.3, 5),
('Sekizinci Seçim', 1640, 520, 10, 4, 8, 9.1, 8),
('Dokuzuncu Seçim', 1375, 260, 10, 5, 2, 4.9, 12),
('10 Seçim', 1220, 300, 10, 3, 6, 6.2, 10);
`;

connection.query(insertDataQuery, (error, results, fields) => {
  if (error) throw error;
  console.log("Veri eklendi.");
});

// Bağlantıyı kapatma
connection.end();
