import { Section } from "./section.model";
import { Subject } from "./subject.model";

export class Course {
    _id: String;
    name: String;
    subject: String;
    instructor: Instructor;
    description: String;
    objectives: String[];
    img_url: String;
    price: Number;
    sections: String[];
    type: String;
}
export class CourseDetails {
    _id: String;
    name: String;
    subject: Subject;
    instructor: Instructor;
    description: String;
    objectives: String[];
    img_url: String;
    price: Number;
    sections: Section[];
    type: String;
    avgRate: Number;
    reviewsNumber: Number;
}
export class Instructor {
    _id: String;
    firstname: String;
    lastname: String;
}