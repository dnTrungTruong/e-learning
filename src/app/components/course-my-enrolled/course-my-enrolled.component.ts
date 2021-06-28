import { Component, OnInit } from '@angular/core';
import {  UserService, AttemptService, UserProgressService } from '../../services';
import { Course, Attempt, UserProgress } from '../../models';
import {Router} from "@angular/router"

@Component({
  selector: 'app-course-my-enrolled',
  templateUrl: './course-my-enrolled.component.html',
  styleUrls: ['./course-my-enrolled.component.css']
})
export class CourseMyEnrolledComponent implements OnInit {

  moocCoursesList: Course[] = [];
  onlineCoursesList: Course[] = [];
  programingCoursesList: Course[] = [];
  noResult:boolean = false;

  constructor(
    private userService: UserService,
    private attemptService: AttemptService,
    private userProgressService: UserProgressService,
    private router: Router
  ) {
    userService.getMyEnrolledCourses()
    .subscribe((courses: Course[]) => {
      if (courses.length) {
        this.noResult=false;
        for(let course of courses) {
          if (course.type == 'programing') {
            this.userProgressService.getUserProgress(course._id.toString()).subscribe((userProgress: UserProgress) => {
              if (userProgress) {
                let passedLessons = 0;
                let totalLessons = 0;
                for (let section of course.sections) {
                  totalLessons += section.lessons.length;
                }
                for (let section of userProgress.progresses) {
                  passedLessons += section.passedLessons.length;
                }
                course.userProgress = (passedLessons / totalLessons * 100).toFixed(0);
                if(userProgress.certificate) {
                  course.userCertificate = userProgress.certificate;
                }
              }
              else {
                course.userProgress = "0";
              }
            })
          }
          else {
            this.attemptService.getAttempt(course._id.toString()).subscribe((attempt: Attempt) => {
              if(attempt) {
                let totalQuiz = attempt.quizzes.length ;
                let passedQuiz = 0;
                for(let i=0; i < attempt.quizzes.length; i++) {
                  if (attempt.quizzes[i].isPassed) {
                    passedQuiz++;
                  }
                }
                course.userProgress = (passedQuiz / totalQuiz * 100).toFixed(0);
                if (attempt.certificate) {
                  course.userCertificate = attempt.certificate;  
                }
              }
              else {
                course.userProgress = "0";
              }
            })
          }
          
          if (course.type === "mooc") {
            this.moocCoursesList.push(course);
          }
          if (course.type === "online") {
            this.onlineCoursesList.push(course);
          }
          if (course.type === "programing") {
            this.programingCoursesList.push(course);
          }
        }
      }
      else {
        this.noResult=true;
      }
    })
  }

  ngOnInit(): void {
  }
  
  public calculateProgress(courseId: string) {
    
    return 0;
  }
  public goToCourseLearningPage(courseId:string, courseType: string) {
    this.router.navigate([`course/learning/${courseType}/${courseId}`])
  }

}
