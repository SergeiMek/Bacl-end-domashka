import express, {Request, Response} from "express"
import {videoRoute} from "./routes/video-route";
import {blogsRoute} from "./routes/blog-route";
import {postsRoute} from "./routes/posts-route";
import {blogsCollection, postsCollection, usersCollection, videosCollection} from "./db/db";
import {usersRoute} from "./routes/users-route";
import {authRoute} from "./routes/auth-route";


export const app = express()


app.use(express.json())
app.delete('/testing/all-data', async (req: Request, res: Response) => {
    const res1 = await videosCollection.deleteMany({})
    const res2 = await blogsCollection.deleteMany({})
    const res3 = await postsCollection.deleteMany({})
    const res4 = await usersCollection.deleteMany({})

    res.sendStatus(204)
})

/*const parserMiddleware = bodyParser({})
app.use(parserMiddleware)*/

app.use('/videos', videoRoute)
app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)














