import express, {Request, Response} from "express"


export const app = express()

app.use(express.json())


const AvailableResolutions: string[] = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithBodyAndParams<P, B> = Request<P, {}, B, {}>
type errorType = {
    errorsMessages: ErrorMessageType[]
}

type ErrorMessageType = {
    field: string
    message: string
}
type UpdateVideoDta = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
}

type VideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: typeof AvailableResolutions
}

const videos: Array<VideoType> = [
    {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-11-08T13:08:16.611Z",
        publicationDate: "2023-11-08T13:08:16.611Z",
        availableResolutions: [
            "P144"
        ]
    }
]


app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/videos/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id: number = +req.params.id

    const video = videos.find((v) => v.id === id)

    if (!video) {
        res.sendStatus(404)
        return
    }

    res.send(video)
})

type BodyPost = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableResolutions
}


app.post('/videos', (req: RequestWithBody<BodyPost>, res: Response) => {
    let errors: errorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions} = req.body
    if (title === null) {
        title = ''
    }

    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({message: "Invalid Title", field: "title"})
    }

    /* if (typeof title === null) {
         errors.errorsMessages.push({message: "Invalid Title", field: "title"})
     }*/

    if (!title) {
        errors.errorsMessages.push({message: "Invalid Title", field: "title"})
    }
    if (!author || !title.trim() || title.trim().length > 20) {
        errors.errorsMessages.push({message: "Invalid author", field: "author"})
    }

    if (Array.isArray(AvailableResolutions)) {
        availableResolutions.map((m) => {
            !AvailableResolutions.includes(m) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions"
            })
        })
    } else {
        availableResolutions = []
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors.errorsMessages)
        return
    }
    const createdAt = new Date()
    const publicationDate = new Date()

    publicationDate.setDate(createdAt.getDate() + 1)

    const newVideo = {
        id: +(new Date()),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: availableResolutions
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.put('/videos/:id', (req: RequestWithBodyAndParams<{ id: string }, UpdateVideoDta>, res: Response,) => {
    const id: number = +req.params.id
    let errors: errorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction} = req.body
    if (title === null) {
        title = ''
    }

    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({message: "Invalid Title", field: "title"})
    }
    if (!author || !title.trim() || title.trim().length > 20) {
        errors.errorsMessages.push({message: "Invalid author", field: "author"})
    }

    if (Array.isArray(AvailableResolutions)) {
        availableResolutions.map((m) => {
            !AvailableResolutions.includes(m) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions"
            })
        })
    } else {
        availableResolutions = []
    }

    if (typeof canBeDownloaded === "undefined") {
        canBeDownloaded = false
    }
    if (typeof minAgeRestriction !== 'undefined' && typeof minAgeRestriction === 'number') {
        minAgeRestriction < 1 || minAgeRestriction > 18 && errors.errorsMessages.push({
            message: "Invalid minAgeRestriction",
            field: "minAgeRestriction"
        })
    } else {
        minAgeRestriction = null
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors.errorsMessages)
        return
    }
    const videoIndex = videos.findIndex(v => v.id === id)
    const video = videos.find(v => v.id === id)
    if (!video) {
        res.sendStatus(404)
        return;
    }
    const updateItem = {
        ...video,
        canBeDownloaded,
        minAgeRestriction,
        title,
        author,
        availableResolutions,
        publicationDate: publicationDate ? publicationDate : video.publicationDate

    }
    videos.splice(videoIndex, 1, updateItem)
    res.sendStatus(204)
})

app.delete('/videos/:id', (req: RequestWithParams<{ id: string }>, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return
        }
    }
    res.send(404)

})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length)
    res.sendStatus(204)
})

