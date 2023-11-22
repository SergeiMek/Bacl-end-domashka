import {VideoType} from "../types/video/output";
import {blogsType} from "../types/blog/output";
import {postsType} from "../types/post/output";
import dotenv from 'dotenv'
import {MongoClient} from "mongodb";



dotenv.config()
const mongoUri = process.env.MONGO_URL

if(!mongoUri){
    throw new Error('! URL doesnt found')
}

export const client = new MongoClient(mongoUri)
const db =  client.db("blogs")

export const videosCollection =db.collection<VideoType>("videos")
export const blogsCollection =db.collection<blogsType>("blogs")
export const postsCollection =db.collection<postsType>("posts")


export async function runDb() {
    try {
        await client.connect();
        console.log("Connected successfully to mongo server");
    } catch {
        console.log("Can't connect to db")
        await client.close();
    }
}
