import { Course } from "./course.model";
import { Section } from "./section.model";

export class UserProgress {
    _id: String;
    course: Course;
    user: String;
    progresses: [{
        section: String,
        passedLessons: String[],
        currentLesson: Number
    }];
    certificate: String;
}
