import { MongoClient } from 'mongodb';

const SOURCE_URI = 'mongodb://root:example@localhost:27017';

async function setupData() {
    const client = await MongoClient.connect(SOURCE_URI);
    const db = client.db("dummyDb");

    for (let i = 1; i <= 5; i++) {
        const collection = db.collection(`collection${i}`);
        const docs = Array.from({ length: 10 }, (_, j) => ({ collection: i, doc: j }));
        await collection.insertMany(docs);
    }

    await client.close();
    console.log("Dummy data setup completed!");
}

setupData().catch(error => {
    console.error("Data setup failed:", error);
});
