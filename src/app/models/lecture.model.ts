import { Resource } from "./resource.model";

export class Lecture {
    _id: String;
    name: String;
    section: String;
    course: String;
    resources: Resource[];
    url: String;
}
