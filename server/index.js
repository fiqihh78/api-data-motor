const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

let dataMotor = [
  {
    id: 1,
    merk: "Honda",
    nama: "Vario 160",
    tahun: 2024,
    warna: "Hitam",
    harga: 27000000,
    cc: 160,
  },
  {
    id: 2,
    merk: "Yamaha",
    nama: "NMAX 155",
    tahun: 2023,
    warna: "Biru",
    harga: 32000000,
    cc: 155,
  },
  {
    id: 3,
    merk: "Honda",
    nama: "Beat Street",
    tahun: 2024,
    warna: "Silver",
    harga: 19000000,
    cc: 110,
  },
  {
    id: 4,
    merk: "Yamaha",
    nama: "Aerox 155",
    tahun: 2024,
    warna: "Merah",
    harga: 29000000,
    cc: 155,
  },
  {
    id: 5,
    merk: "Honda",
    nama: "PCX 160",
    tahun: 2024,
    warna: "Putih",
    harga: 33000000,
    cc: 160,
  },
  {
    id: 6,
    merk: "Yamaha",
    nama: "Mio M3",
    tahun: 2023,
    warna: "Hitam",
    harga: 18000000,
    cc: 125,
  },
  {
    id: 7,
    merk: "Honda",
    nama: "Vario 125",
    tahun: 2023,
    warna: "Merah",
    harga: 23000000,
    cc: 125,
  },
  {
    id: 8,
    merk: "Suzuki",
    nama: "GSX-R150",
    tahun: 2023,
    warna: "Biru",
    harga: 36000000,
    cc: 150,
  },
  {
    id: 9,
    merk: "Kawasaki",
    nama: "Ninja 250",
    tahun: 2024,
    warna: "Hijau",
    harga: 66000000,
    cc: 250,
  },
  {
    id: 10,
    merk: "Yamaha",
    nama: "R15",
    tahun: 2024,
    warna: "Biru",
    harga: 40000000,
    cc: 155,
  },
];

// Halaman utama API
app.get("/", (req, res) => {
  res.json({
    message: "API Data Sepeda Motor Berhasil Berjalan",
  });
});

// GET: Menampilkan semua data motor
app.get("/api/motor", (req, res) => {
  res.json({
    message: "Berhasil mengambil data motor",
    data: dataMotor,
  });
});

// GET: Menampilkan motor berdasarkan ID
app.get("/api/motor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const motor = dataMotor.find((item) => item.id === id);

  if (!motor) {
    return res.status(404).json({
      message: "Data motor tidak ditemukan",
    });
  }

  res.json({
    message: "Data motor ditemukan",
    data: motor,
  });
});

// POST: Menambahkan data motor
app.post("/api/motor", (req, res) => {
  const { merk, nama, tahun, warna, harga, cc } = req.body;

  if (!merk || !nama || !tahun || !warna || !harga || !cc) {
    return res.status(400).json({
      message: "Semua data motor wajib diisi",
    });
  }

  const motorBaru = {
    id: dataMotor.length ? Math.max(...dataMotor.map((item) => item.id)) + 1 : 1,
    merk,
    nama,
    tahun,
    warna,
    harga,
    cc,
  };

  dataMotor.push(motorBaru);

  res.status(201).json({
    message: "Data motor berhasil ditambahkan",
    data: motorBaru,
  });
});

// PUT: Mengubah data motor
app.put("/api/motor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataMotor.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Data motor tidak ditemukan",
    });
  }

  dataMotor[index] = {
    ...dataMotor[index],
    ...req.body,
    id,
  };

  res.json({
    message: "Data motor berhasil diperbarui",
    data: dataMotor[index],
  });
});

// DELETE: Menghapus data motor
app.delete("/api/motor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataMotor.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Data motor tidak ditemukan",
    });
  }

  const motorDihapus = dataMotor.splice(index, 1);

  res.json({
    message: "Data motor berhasil dihapus",
    data: motorDihapus[0],
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
