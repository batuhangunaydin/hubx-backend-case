import { MongoClient, ObjectId } from 'mongodb';
import { NoSQLDatabaseWrapper } from '../../interfaces/data-sources/nosql-database-wrapper';
import { MongoDBBookDataSource } from './mongodb-book-data-source';
import config from '../../../config/config';

export async function connectToMongoDB() {
    const client: MongoClient = new MongoClient(config.mongo.url);
    await client.connect();
    const db = client.db(config.mongo.dbName);

    const bookDatabase: NoSQLDatabaseWrapper = {
        find: (query) => db.collection("books").find(query).toArray(),
        insertOne: (doc) => db.collection("books").insertOne(doc),
        deleteOne: (id: string) => db.collection("books").deleteOne({ _id: new ObjectId(id) }),
        updateOne: (id: string, data: object) => db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: data })
    }

    return new MongoDBBookDataSource(bookDatabase);
}