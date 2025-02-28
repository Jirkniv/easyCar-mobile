import express from "express";
import cors from "cors";
import client from "./db.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

const port = 9999;

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});