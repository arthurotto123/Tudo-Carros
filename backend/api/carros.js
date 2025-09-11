import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Carro from "../models/Carro.js"; // Ajuste o caminho conforme sua estrutura

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middlewares



// Permitir qualquer frontend temporariamente (para testar)
app.use(cors()); 


app.use(express.json());

// Conexão com MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

// Rotas
app.get("/carros", async (req, res) => {
  const { make, model, year, version } = req.query;
  if (!make || !model) return res.status(400).json({ error: "Informe marca e modelo" });

  try {
    const veiculos = await Carro.find({
      make: { $regex: `^${make}$`, $options: "i" },
      model: { $regex: `^${model}$`, $options: "i" },
      ...(year && { year }),
      ...(version && { version: { $regex: `${version}$`, $options: "i"}})
    });
    return veiculos.length
      ? res.status(200).json(veiculos)
      : res.status(404).json({ error: "Veículos não encontrados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/carros", async (req, res) => {
  try {
    const carro = new Carro(req.body);
    await carro.save();
    res.status(201).json(carro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
