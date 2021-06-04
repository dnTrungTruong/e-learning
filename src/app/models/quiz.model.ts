
export class Quiz {
    _id: String;
    name: String;
    section: String;
    course: String;
    courseName: String;
    courseType: String;
    questions: Question[];
    correctAnswers: Number;
    totalScore: Number;
}
export class Question {
    _id: String;
    question: String;
    answers: String[];
    correctAnswer: String;
    userAnswer: String;
}

