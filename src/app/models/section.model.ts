import { Lecture } from "./lecture.model";
import { Announcement } from "./announcement.model";


export class Section {
    _id: String;
    name: String;
    course: String;
    lectures: Lecture[];
    quiz: String;
    announcements: Announcement[];
}
