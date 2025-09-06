// T8PVOdz2iVkJBDWY
//arthurottocoelho_db_user


//mongodb+srv://arthurottocoelho_db_user:T8PVOdz2iVkJBDWY@carros.lxphrbq.mongodb.net/?retryWrites=true&w=majority&appName=carros

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Carro from "../models/Carro.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Rotas
app.get("/carros/vin/:vin", async (req, res) => {
  const { vin } = req.params;
  const carro = await Carro.findOne({ vin });
  carro ? res.json(carro) : res.status(404).json({ error: "Veículo não encontrado" });
});

app.get("/carros", async (req, res) => {
  const { make, model, year } = req.query;
  if (!make || !model || !year) return res.status(400).json({ error: "Informe marca, modelo e ano" });

  const carros = await Carro.find({ make, model, year });
  carros.length ? res.json(carros) : res.status(404).json({ error: "Veículos não encontrados" });
});

app.post("/carros", async (req, res) => {
  const carro = new Carro(req.body);
  await carro.save();
  res.status(201).json(carro);
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
