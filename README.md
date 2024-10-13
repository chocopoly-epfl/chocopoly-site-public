# Chocopoly

Le site web public de Chocopoly.

## Déploiement

* Lancer l'image Docker avec l'environnement suivant :
```bash
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/chocopoly"

JWT_SECRET_KEY=RANDOM
ADMIN_PASSWORD=PASSWORD
```

Prisma se chargera de créer automatiquement les tables, etc., il n'y a rien de plus à faire.

L'appli se lance sur le port 3000.
