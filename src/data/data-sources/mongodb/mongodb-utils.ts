import { MongoClient, ObjectId } from 'mongodb';
import { NoSQLDatabaseWrapper } from '../../interfaces/data-sources/nosql-database-wrapper';
import { MongoDBBookDataSource } from './mongodb-book-data-source';
import config from '../../../config/config';

export async function connectToMongoDB() {
    console.log(config.mongo.url);
    const client: MongoClient = new MongoClient(config.mongo.url);
    await client.connect();
    const db = client.db(config.mongo.dbName);

    const bookDatabase: NoSQLDatabaseWrapper = {
        find: (query) => db.collection("books").find(query).toArray(),
        async insertOne(doc) {
            const created = await db.collection("books").insertOne(doc);
            const response = {
                id: created.insertedId,
                title: doc.title,
                author: doc.author,
                price: doc.price,
                isbn: doc.isbn,
                language: doc.language,
                numberOfPages: doc.numberOfPages,
                publisher: doc.publisher
            };
            return response;
        },
        deleteOne: (id: string) => db.collection("books").deleteOne({ _id: new ObjectId(id) }),
        updateOne: (id: string, data: object) => db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: data })
    }

    return new MongoDBBookDataSource(bookDatabase);
}