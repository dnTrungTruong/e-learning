import { Lecture } from "./lecture.model";


export class Section {
    _id: String;
    name: String;
    course: String;
    lectures: Lecture[];
    quiz: String;
}
