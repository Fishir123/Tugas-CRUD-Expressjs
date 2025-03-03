var express = require("express");
var router = express.Router();
var connection = require("../config/database_mhs.js");

/* GET: Menampilkan Data Mahasiswa */
router.get("/", (req, res, next) => {
  connection.query("SELECT * FROM mahasiswa", (err, rows) => {
    if (err) {
      req.flash("error", err.message);
      return res.render("mahasiswa", { data: [], messages: req.flash() });
    }
    res.render("mahasiswa", { data: rows, messages: req.flash() });
  });
});

router.get("/create", (req, res) => {
  res.render("mahasiswa/create", {
    data: {},
    messages: req.flash(),
  });
});


router.post("/store", (req, res) => {
  let {
    nama,
    nrp,
    tgl_lahir,
    jenis_kelamin,
    agama,
    hoby,
    alamat,
    program_studi,
  } = req.body;

  let query = `
    INSERT INTO mahasiswa (nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi) 
    VALUES ('${nama}', '${nrp}', '${tgl_lahir}', '${jenis_kelamin}', '${agama}', '${hoby}', '${alamat}', '${program_studi}')
  `;

  connection.query(
    query,
    [nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi],
    (err) => {
      if (err) {
        req.flash("error", "Gagal menambahkan data mahasiswa! " + err.message);
        return res.redirect("/mahasiswa/create");
      }

      req.flash("success", "Data mahasiswa berhasil ditambahkan!");
      res.redirect("/mahasiswa");
    }
  );
});



/* GET: Form Edit */
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mhs = ?",
    [id],
    (err, rows) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/mahasiswa");
      }

      if (rows.length === 0) {
        req.flash("error", "Mahasiswa tidak ditemukan!");
        return res.redirect("/mahasiswa");
      }

      res.render("mahasiswa/edit", { data: rows[0], messages: req.flash() });
    }
  );
});

/* POST: Update Data Mahasiswa */
router.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let {
    nama,
    nrp,
    tgl_lahir,
    jenis_kelamin,
    agama,
    hoby,
    alamat,
    program_studi,
  } = req.body;

  let query = `UPDATE mahasiswa SET 
    nama = '${nama}', 
    nrp = '${nrp}', 
    tgl_lahir = '${tgl_lahir}', 
    jenis_kelamin = '${jenis_kelamin}', 
    agama = '${agama}', 
    hoby = '${hoby}', 
    alamat = '${alamat}', 
    program_studi = '${program_studi}'
    WHERE id_mhs = '${id}'`;

  connection.query(query,(err) => {
      if (err) {
        req.flash("error", "Gagal memperbarui data mahasiswa! " + err.message);
        return res.redirect(`/mahasiswa/edit/${id}`);
      }

      req.flash("success", "Data mahasiswa berhasil diperbarui!");
      res.redirect("/mahasiswa");
    }
  );
});

router.get("/delete/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `delete from mahasiswa where id_mhs = ${id}`,
    function (err) {
      if (err) {
        req.flash("error", "gagal query");
      } else {
        req.flash("success", "Data terhapus");
      }
      res.redirect("/mahasiswa");
    }
  );
});
module.exports = router;
