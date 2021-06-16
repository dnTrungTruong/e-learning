import { Quiz, Question } from "./quiz.model";
import { Course } from "./course.model";

export class Attempt {
    _id: String;
    course: Course;
    user: String;
    quizzes: [{
        quiz: Quiz,
        attempts: [{
            score: Number,
            questions: Question[],
            attemptDate: Date,
            attemptEndTime: Date,
            attemptSubmittedTime: Date
        }],
        highestScore: Number,
        isPassed: Boolean
    }];
    certificate: String;
}

