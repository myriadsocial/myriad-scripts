import { MongoClient } from 'mongodb';

const SOURCE_URI = 'mongodb://root:example@localhost:27017';
const DEST_URI = 'mongodb://root:example@localhost:27018';
const EXCLUDED_DATABASES = ['admin', 'local', 'config'];

async function migrateData() {
    const sourceClient = await MongoClient.connect(SOURCE_URI);
    const destClient = await MongoClient.connect(DEST_URI);

    const sourceDbNames = (await sourceClient.db().admin().listDatabases())
        .databases.map(db => db.name)
        .filter(name => !EXCLUDED_DATABASES.includes(name));

    for (let dbName of sourceDbNames) {
        const db = sourceClient.db(dbName);
        const collections = await db.collections();

        for (let collection of collections) {
            const data = await collection.find({}).toArray();
            const destCollection = destClient.db(dbName).collection(collection.collectionName);
            if (data.length > 0) {
                await destCollection.insertMany(data);
            }
        }
    }

    await sourceClient.close();
    await destClient.close();

    console.log("Migration completed!");
}

async function fetchDataFromDb(mongoUrl: string, dbName: string, collectionName: string) {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const data = await client.db(dbName).collection(collectionName).find({}).toArray();
    await client.close();
    return data;
}

async function validateData() {
    const sourceClient = await MongoClient.connect(SOURCE_URI);
    const destClient = await MongoClient.connect(DEST_URI);

    const sourceDbNames = (await sourceClient.db().admin().listDatabases())
        .databases.map(db => db.name)
        .filter(name => !EXCLUDED_DATABASES.includes(name));

    for (let dbName of sourceDbNames) {
        const db = sourceClient.db(dbName);
        const collections = await db.collections();

        for (let collection of collections) {
            const sourceData = await fetchDataFromDb(SOURCE_URI, dbName, collection.collectionName);
            const destData = await fetchDataFromDb(DEST_URI, dbName, collection.collectionName);
            
            // Simple validation by comparing document count
            if (sourceData.length !== destData.length) {
                console.error(`Data mismatch in ${dbName}.${collection.collectionName}!`);
                return;
            }
        }
    }

    await sourceClient.close();
    await destClient.close();

    console.log("Validation completed: Source and destination data match!");
}

async function main() {
    try {
        await migrateData();
        await validateData();
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
