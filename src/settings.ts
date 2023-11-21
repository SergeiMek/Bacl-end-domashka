import express, {Request, Response} from "express"
import {videoRoute} from "./routes/video-route";
import {blogRoute} from "./routes/blog-route";
import {postsRoute} from "./routes/posts-route";



export const app = express()


app.use(express.json())
/*app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos.splice(0, db.videos.length)
    db.posts.splice(0, db.posts.length)
    db.blogs.splice(0, db.blogs.length)
    res.sendStatus(204)
})*/


app.use('/videos', videoRoute)
app.use('/blogs', blogRoute)
app.use('/posts', postsRoute)















