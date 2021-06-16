import { Role } from "./role.model";
import { Attempt } from "./attempt.model";

export class User {
    userdata: {
        enrolledCourses: string[];
        createdCourses: string[];
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: string;
        birthday: Date;
        role: Role;
        status: string;
        isVerified: boolean;
    };
    token?: string;
}

export class UserDetail {
    enrolledCourses: string[];
    createdCourses: string[];
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    birthday: Date;
    role: Role;
    isVerified: string;
    status: string;
    attempts: Attempt[];
}

export class UserWithName {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
}