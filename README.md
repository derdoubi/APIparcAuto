# API de Gestion de Véhicules — Agence de Location

API REST construite avec **Node.js** et **Express** (ES Modules) permettant de gérer la flotte de véhicules d'une agence de location en mémoire.

## Fonctionnalités

- Lister l'ensemble des véhicules ou filtrer par disponibilité (`?disponible=true`)
- Consulter les détails d'un véhicule par son identifiant
- Ajouter un nouveau véhicule avec attribution automatique de l'`id` et `disponible: true` par défaut
- Modifier partiellement les informations d'un véhicule (ex. changer sa disponibilité)
- Supprimer un véhicule
- Journalisation des requêtes HTTP (méthode et URL) via un middleware dédié
- Gestion centralisée des erreurs en JSON (`400`, `404`)

---

## Structure du projet

```text
agence-location-api/
├── middlewares/
│   └── journal.js       # Middleware de journalisation (méthode + URL)
├── routes/
│   └── vehicules.js     # Routes CRUD et données en mémoire
├── .gitignore           # Exclusion de node_modules
├── package.json         # Dépendances et configuration ES Modules ("type": "module")
├── README.md            # Documentation du projet
└── server.js            # Point d'entrée du serveur Express