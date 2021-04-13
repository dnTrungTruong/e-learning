import { Section } from "./section.model";

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
}
export class CourseDetails {
    _id: String;
    name: String;
    subject: String;
    instructor: Instructor;
    description: String;
    objectives: String[];
    img_url: String;
    price: Number;
    sections: Section[];
}
export class Instructor {
    _id: String;
    firstname: String;
    lastname: String;
}