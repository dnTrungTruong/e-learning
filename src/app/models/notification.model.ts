import { UserWithName } from "./user.model";
import { Course } from "./course.model";
import { Review } from "./review.model";

export class Notification {
    _id: String;
    users: {
        _id: String;
        checked: Boolean;
    }
    performedBy: UserWithName;
    target: {
        course: Course;
        review: Review;
    }
    action: String;
    date: Date;
}