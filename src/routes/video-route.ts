import {Request, Response, Router} from "express";
import {errorType, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {BodyPost} from "../types/video/input";
import {AvailableResolutions} from "../types/video/output";
import {UpdateVideoDta} from "../types/video/input";
import {videoCollection} from "../db/db";

export const videoRoute = Router({})

//const videos = db.videos

videoRoute.get('/', async (req: Request, res: Response) => {
    //res.send(videos)
    const products = await videoCollection.find({}).toArray()
    res.send(products)
})

videoRoute.get('/:id', (req: RequestWithParams<{
    id: string
}>, res: Response) => {
    const id: number = +req.params.id

    const video = videos.find((v) => v.id === id)

    if (!video) {
        res.sendStatus(404)
        return
    }

    res.send(video)
})


videoRoute.post('/', async (req: RequestWithBody<BodyPost>, res: Response) => {
    let errors: errorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions} = req.body


    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({message: "Invalid Title", field: "title"})
    }


    if (!author || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({message: "Invalid author", field: "author"})
    }


    if (Array.isArray(availableResolutions)) {
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
        res.status(400).send(errors)
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
   /* videos.push(newVideo)
    res.status(201).send(newVideo)*/
    const result = await videoCollection.insertOne(newVideo)
    res.status(201).send(newVideo)
})

videoRoute.put('/:id', (req: RequestWithBodyAndParams<{ id: string }, UpdateVideoDta>, res: Response,) => {
    const id: number = +req.params.id
    let errors: errorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction} = req.body


    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({message: "Invalid Title", field: "title"})
    }
    if (!author || !author.trim() || author.trim().length > 20) {
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
    if (typeof canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({message: "Invalid  canBeDownloaded", field: "canBeDownloaded"})
    }
    if (typeof publicationDate !== "string") {
        errors.errorsMessages.push({message: "Invalid  publicationDate", field: "publicationDate"})
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
        res.status(400).send(errors)
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

videoRoute.delete('/:id', (req: RequestWithParams<{
    id: string
}>, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return
        }
    }
    res.send(404)

})


