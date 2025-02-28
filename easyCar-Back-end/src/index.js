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
app.post("/rides", controllerRide.Insert);
app.delete("/rides/:ride_id", controllerRide.Delete);
app.put("/rides/:ride_id/finish", controllerRide.Finish);
app.get("/rides/drivers/:driver_user_id", controllerRide.ListForDriver);
app.get("/rides/:ride_id", controllerRide.ListDetail);
app.put("/rides/:ride_id/accept", controllerRide.Accept);
app.put("/rides/:ride_id/cancel", controllerRide.Cancel);


app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});