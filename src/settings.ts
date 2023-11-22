import express, {Request, Response} from "express"
import {videoRoute} from "./routes/video-route";
import {blogsRoute} from "./routes/blog-route";
import {postsRoute} from "./routes/posts-route";
import bodyParser from 'body-parser'
import {blogsCollection, postsCollection, videosCollection} from "./db/db";


export const app = express()


app.use(express.json())
app.delete('/testing/all-data', async (req: Request, res: Response) => {
    const res1 = await videosCollection.deleteMany({})
    const res2 = await blogsCollection.deleteMany({})
    const res3 = await postsCollection.deleteMany({})

    res.sendStatus(204)
})


/*const parserMiddleware = bodyParser({})
app.use(parserMiddleware)*/

app.use('/videos', videoRoute)
app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)















