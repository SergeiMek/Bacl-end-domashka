import {VideoType} from "../types/video/output";
import {blogsType} from "../types/blog/output";
import {postsType} from "../types/post/output";

type dbType = {
    videos: Array<VideoType>
    blogs: Array<blogsType>
    posts: Array<postsType>
}


export const db: dbType = {
    videos: [
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
        },
    ],
    blogs: [{
        id: "1",
        name: "string",
        description: "string",
        websiteUrl: "string"
    }],
    posts: [{
        id: "1",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "1",
        blogName: "4"

    }]
}