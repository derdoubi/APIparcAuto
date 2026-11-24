import { Router } from "express";

const router = Router();

let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

let nextId = 4;


router.get("/", (req, res) => {
  if (req.query.disponible !== undefined) {
    const estDisponible = req.query.disponible === "true";
    const filtres = vehicules.filter((v) => v.disponible === estDisponible);
    return res.status(200).json(filtres);
  }

  return res.status(200).json(vehicules);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const vehicule = vehicules.find((v) => v.id === id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  return res.status(200).json(vehicule);
});


router.post("/", (req, res) => {
  const { marque, modele, immatriculation } = req.body;

  if (!marque || !modele || !immatriculation) {
    return res.status(400).json({ erreur: "Champs obligatoires manquants" });
  }

  const nouveauVehicule = {
    id: nextId++,
    marque: String(marque).trim(),
    modele: String(modele).trim(),
    immatriculation: String(immatriculation).trim(),
    disponible: true
  };

  vehicules.push(nouveauVehicule);
  return res.status(201).json(nouveauVehicule);
});


router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const vehicule = vehicules.find((v) => v.id === id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  const champsAutorises = ["marque", "modele", "immatriculation", "disponible"];

  for (const champ of champsAutorises) {
    if (req.body[champ] !== undefined) {
      if (champ === "disponible") {
        vehicule.disponible = Boolean(req.body.disponible);
      } else {
        vehicule[champ] = String(req.body[champ]).trim();
      }
    }
  }

  return res.status(200).json(vehicule);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = vehicules.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  vehicules.splice(index, 1);
  return res.status(204).send();
});

export default router;