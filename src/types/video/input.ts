import {AvailableResolutions} from "./output";

export type BodyPost = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableResolutions
}

export type UpdateVideoDta = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
}