require('dotenv').config();

const bodyParser = require("body-parser");
const express = require("express");
const mysql = require('mysql2')
const app = express();
const path = require("path");
const multer = require('multer');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((error) =>{
  if(error) {
    console.log("Erro ao conectar: ", error)
    return
  }
  console.log("Conectado ao Banco!")
})


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index", { title: "Portifólio Diego" });
});

app.get("/cadastro-projeto", (req, res) => {
  res.render("cadastro", { title: "Cadastro Projetos" });
});

// GET de todos os projetos
app.get("/projects", (req, res) => {
  db.query('SELECT * FROM projetos', (err, results) => {
    if(err) return res.status(500).send(err);
    res.render("projects", { title: "Meus projetos", projetos: results});
  })
});

// DELETE de um projeto
app.delete("/projects/:id", (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM projetos WHERE id = ?', [id], (err, result) => {
    if(err) return res.status(500).send(err);
    res.status(200).send('Projeto deletado');
  })
})

// CREATE de um projeto
app.post("/cadastro-projeto", (req, res) => {
  const {titulo, descricao, estado, url, imagem} = req.body;
  const sql = 'INSERT INTO projetos (titulo, descricao, estado, url, imagem) VALUES (?, ?, ?, ?, ?)' 
  
  db.query(sql, [titulo, descricao, estado, url, imagem], (err, result) => {
    if(err) return res.status(500).send(err);
    res.send({ id: result.insertId, nome, descricao, estado, url, imagem });
  })
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando: http://localhost:${PORT}`));
