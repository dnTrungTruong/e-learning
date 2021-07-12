import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, UserProgressService, CertificateService } from '../../services';
import { CourseDetails, UserProgress } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-programing-learning',
  templateUrl: './course-programing-learning.component.html',
  styleUrls: ['./course-programing-learning.component.css']
})
export class CourseProgramingLearningComponent implements OnInit {

  course: CourseDetails;
  courseId: string;
  userProgress: UserProgress;

  constructor(
    private courseService: CourseService,
    private userProgressService: UserProgressService,
    private certificateService: CertificateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getProgramingCourseLearningDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          return this.router.navigate(["/error/404"]);
        }
        this.course = course;
        this.userProgressService.getUserProgress(this.courseId).subscribe((userProgress: UserProgress) => {
          this.userProgress = userProgress;
        })
      })
  }

  ngOnInit(): void {
  }

  getSectionProgress(section: string) {
    if (this.userProgress) {
      const index = this.userProgress.progresses.findIndex((element) => element.section == section);
      if (index != -1) {
        return this.userProgress.progresses[index].passedLessons.length;
      }
      else {
        return 0;
      }
    }
    else {
      return 0
    }
  }

  isPassedLesson(section: string, lesson: string) {
    if (this.userProgress) {
      const index = this.userProgress.progresses.findIndex((element) => element.section == section);
      if (index != -1) {
        if (this.userProgress.progresses[index].passedLessons.includes(lesson)) {
          return true;
        }
      }
    }
    return false;
  }

  chooseLesson(sectionId: string, lessonIndex: number) {
    this.userProgressService.updateCurrentLesson(this.courseId, sectionId, lessonIndex).subscribe(res => {
      if (res.message == "success") {
        this.router.navigate([`coding/${this.courseId}/${sectionId}`]);
      }
      else {
        alert(res.message);
      }
    })
  }

  isPassedAllLessons() {
    if (this.course && this.userProgress) {
      let passed = 0;
      let lessons = 0;
      for (let section of this.course.sections) {
        lessons += section.lessons.length;
      }
      for (let section of this.userProgress.progresses) {
        passed += section.passedLessons.length;
      }
      if (passed == lessons) {
        return true;
      }
    }
    return false
  }

  claimCertificate() {
    if (this.isPassedAllLessons()) {
      this.certificateService.createProgramingCertificate(this.courseId).subscribe(res => {
        if (res.message == "success") {
          let certId = res['data']['_id'];
          this.router.navigate([`/certificate/${certId}`]);
        }
        else {
          alert(res.message);
        }
      })
    }
  }

}
