import express from "express";
import { journal } from "./middlewares/journal.js";
import vehiculesRouter from "./routes/vehicules.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(journal);

app.use("/vehicules", vehiculesRouter);


app.use((req, res) => {
  res.status(404).json({ erreur: "Route introuvable" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});