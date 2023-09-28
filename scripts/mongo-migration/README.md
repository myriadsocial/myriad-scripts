# MongoDB Data Migration Tool

This tool facilitates the migration of data from a source MongoDB instance to a destination MongoDB instance. Additionally, it validates the migrated data to ensure consistency between the two databases.

## 📋 Prerequisites
- Docker & Docker Compose
- Node.js
- [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### 1. Clone & Navigate

```sh
git clone [repository-url]
cd myriad-scripts/scripts/mongo-migration
```

Replace [repository-url] with your repo's URL.

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Setup & Start MongoDB Instances

This step populates the source MongoDB with dummy data:

```sh
pnpm run setup
```

### 4. Migrate and Validate

```sh
pnpm start
```

After migration, the tool will validate the data consistency between the source and destination MongoDB.

### 5. Teardown (Optional)

To stop the MongoDB instances:

```sh
pnpm run teardown
```

## 📜 Key Files Explanation
- `docker-compose.yml`: Defines the configurations for the source and destination MongoDB Docker containers.
- `index.ts`: Handles the data migration and validation logic.
- `setup.ts`: A script for populating dummy data to the source MongoDB.
- `package.json`: Project metadata and scripts.

## ⚠️ Note
Always ensure you have the necessary backups before performing migrations in a production environment.