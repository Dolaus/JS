import {Exhibition} from "../exhibition/exhibition.entity";

export interface INewPostPayload {
    userId: number;
    post: Exhibition;
}
