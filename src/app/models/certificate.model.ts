import { Course } from "./course.model";
import { UserWithName } from "./user.model";

export class Certificate {
    _id: String;
    course: Course;
    user: UserWithName;
    date: Date;
    finalScore: Number;
    url: String;
}

