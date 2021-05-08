import { UserWithName } from "./user.model";

export class Review {
    _id: String;
    course: String;
    user: UserWithName;
    rate: Number;
    content: String;
    reply: {
        user: UserWithName;
        content: String;
        date: Date;
    };
    date: Date;
}