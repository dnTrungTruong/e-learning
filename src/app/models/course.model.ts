export class Course {
    _id: String;
    name: String;
    subject: String;
    instructor: Instructor;
    description: String;
    price: Number;
    sections: String[];
}

export class Instructor {
    _id: String;
    firstname: String;
    lastname: String;
}