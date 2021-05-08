import { UserWithName } from "./user.model";

export class Announcement {
    _id: String;
    course: String;
    user: UserWithName;
    title: String;
    content: String;
    date: Date;
    comments: Comment[];
}
export class Comment {
    _id: String;
    user: UserWithName;
    content: String;
    replies: {
        user: UserWithName;
        content: String;
        date: Date;
    };
    date: Date;
}