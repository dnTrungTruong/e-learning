import { Lecture } from "./lecture.model";
import { Lesson } from "./lesson.model";
import { Announcement } from "./announcement.model";


export class Section {
    _id: String;
    name: String;
    course: String;
    lectures: Lecture[];
    lessons: Lesson[];
    quiz: String;
    announcements: Announcement[];
}
