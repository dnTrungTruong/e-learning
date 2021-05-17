import { UserWithName } from "./user.model";
import { Course } from "./course.model";

export class Review {
    _id: String;
    course: Course;
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