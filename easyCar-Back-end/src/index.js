import express from "express";
import cors from "cors";
import { db , execute} from "./database/db.js";
import controllerRide from "./controllers/controller.ride.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

const port = 9999;

app.get("/rides", controllerRide.List );
app.post("/rides", controllerRide.Insert)

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});