import { Role } from "./role.model";

export class User {
    userdata: {
        enrolledCourses: string[];
        createdCourses: string[];
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        birthday: Date;
        role: Role;
    };
    token?: string;
}

export class UserWithName {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
}