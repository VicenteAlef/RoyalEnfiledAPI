const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/REmotos", (req, res) => {
  const {
    name,
    price,
    description,
    image_one_link,
    image_two_link,
    image_three_link,
  } = req.body;

  if (!name || !price || !image_one_link)
    return res.status(400).json({ message: "Preencha os campos obrigatórios" });

  db.run(
    "INSERT INTO motos (name, price, description, image_one_link, image_two_link, image_three_link) VALUES (?, ?, ?, ?, ?, ?)",
    [
      name,
      price,
      description,
      image_one_link,
      image_two_link,
      image_three_link,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Moto cadastrada com sucesso!",
        id: this.lastID,
        name,
      });
    }
  );
});

app.get("/REmotos", (req, res) => {
  db.all("SELECT * FROM motos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

app.get("REmotos/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECTE * FROM motos WHERE id=?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Moto não encontrada!" });
    res.status(200).json(row);
  });
});

app.delete("REmotos/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM motos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ message: "Moto não encontrada" });
    res.status(200).json({ message: "Moto removida com sucesso!" });
  });
});

const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on 192.168.1.3:${port}`);
});
