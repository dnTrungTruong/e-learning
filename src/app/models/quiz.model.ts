import { Course } from "./course.model";

export class Quiz {
    _id: String;
    name: String;
    section: String;
    course: Course;
    questions: Question[];
    correctAnswers: Number;
    totalScore: Number;
    limitTime: Number;
    isFinal: Boolean;
}
export class Question {
    _id: String;
    question: String;
    answers: String[];
    correctAnswer: String;
    userAnswer: String;
}

