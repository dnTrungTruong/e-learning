import { Section } from "./section.model";
import { Subject } from "./subject.model";
import { UserWithName } from "./user.model";

export class Course {
    _id: String;
    name: String;
    subject: Subject;
    instructor: UserWithName;
    overview: String;
    description: String;
    objectives: String[];
    img_url: String;
    price: Number;
    sections: Section[];
    type: String;
    status: String;
    userProgress: String;
    userCertificate: String;
}
export class CourseDetails {
    _id: String;
    name: String;
    subject: Subject;
    instructor: UserWithName;
    overview: String;
    description: String;
    objectives: String[];
    img_url: String;
    price: Number;
    sections: Section[];
    type: String;
    avgRate: Number;
    reviewsNumber: Number;
    tags: Tag[];
    status: String;
}

export class Tag {
    tag: string;
}