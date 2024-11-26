const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.listen(3000, console.log("Servidor encendido"));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("./canciones.json"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("./canciones.json"));
  canciones.push(cancion);
  fs.writeFileSync("./canciones.json", JSON.stringify(canciones));
  res.send("Cancion agregada con exito");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("./canciones.json"));
  const index = canciones.findIndex((c) => c.id == id);
  if (index !== -1) {
    canciones[index] = cancion;
    fs.writeFileSync("./canciones.json", JSON.stringify(canciones));
    res.send("Cancion modificada con exito");
  } else{
    res.status(404).send("Cancion no encontrada");
  }
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("./canciones.json"));
  const index = canciones.findIndex((c) => c.id == id);
  if (index !== -1) {
    canciones.splice(index, 1);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("Cancion eliminada con exito");
  } else {
    res.status(404).send("Cancion no encontrada")
  }

});
