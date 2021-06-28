import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CourseService, UserProgressService, CompilerService } from '../../services';
import { CourseDetails, UserProgress, Lesson } from '../../models';
import * as ace from "ace-builds";
ace.require("ace/ext/language_tools");

@Component({
  selector: 'app-course-programing-coding',
  templateUrl: './course-programing-coding.component.html',
  styleUrls: ['./course-programing-coding.component.css']
})
export class CourseProgramingCodingComponent implements OnInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  aceEditor
  templateCode;
  isFailedRun: Boolean = false;
  runMessage: string = "*** Your output will be shown here ***";
  testMessage: string = "*** Your submit result will be shown here ***";
  isProcessing: Boolean = false;
  courseId: string;
  sectionId: string;
  course: CourseDetails;
  sectionIndexProgress: number;
  currentLesson: Lesson;
  sectionIndexCourse: number;
  userProgress: UserProgress;
  isSideBarOpened: Boolean = false;
  isPassedLesson: Boolean = false;
  isPassedTest: Boolean = false;
  totalLessonsInSection: number;

  constructor(
    private compilerService: CompilerService,
    private courseService: CourseService,
    private userProgressService: UserProgressService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;




  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.sectionId = this.route.snapshot.paramMap.get('sectionId');
  }


  ngAfterViewInit(): void {
    ace.config.set("fontSize", "18px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme("ace/theme/tomorrow_night_eighties");
    this.aceEditor.session.setMode("ace/mode/javascript");
    this.aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      minLines: 40
    });
    // this.aceEditor.on("change", () => {
    //   console.log(this.aceEditor.getValue());
    // });
    this.aceEditor.session.setValue('//Loading template... Please wait!!!');
    this.courseService.getProgramingCourseLearningDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          return this.router.navigate(["/error/404"]);
        }
        this.course = course;
        console.log(course);
        this.sectionIndexCourse = this.course.sections.findIndex((element) => element._id == this.sectionId);
        this.userProgressService.getUserProgress(this.courseId).subscribe((userProgress: UserProgress) => {
          if (!userProgress) {
            return this.router.navigate(["/error/404"]);
          }
          this.userProgress = userProgress;
          if (this.sectionIndexProgress == -1) {

            this.userProgressService.updateCurrentLesson(this.courseId, this.sectionId, 0).subscribe(res => {
              if (res.message == "success") {
                console.log(res);
                this.userProgress = res.data;
                console.log(this.userProgress);
                this.sectionIndexProgress = this.userProgress.progresses.findIndex((element) => element.section == this.sectionId);
                this.totalLessonsInSection = this.course.sections[this.sectionIndexCourse].lessons.length;
                this.loadContents();
              }
              else {
                alert(res.message);
                this.router.navigate([`course/learning/programing/${this.courseId}`]);
              }
            })
          }
          else {
            this.sectionIndexProgress = this.userProgress.progresses.findIndex((element) => element.section == this.sectionId);
            this.totalLessonsInSection = this.course.sections[this.sectionIndexCourse].lessons.length;
            this.loadContents();
          }
        })
      })
  }

  loadContents() {
    let lessonIndex = this.userProgress.progresses[this.sectionIndexProgress].currentLesson.valueOf();
    if (lessonIndex < 0 || lessonIndex >= this.totalLessonsInSection) {
      lessonIndex = 0;
    }
    this.currentLesson = this.course.sections[this.sectionIndexCourse].lessons[lessonIndex];
    this.currentLesson.currentIndex = lessonIndex;
    console.log(this.currentLesson);
    if (this.userProgress.progresses[this.sectionIndexProgress].passedLessons.includes(this.currentLesson._id)) {
      this.isPassedLesson = true;
    }
    else {
      this.isPassedLesson = false;
    }

    let params = {};
    params['name'] = this.currentLesson.path;
    this.compilerService.getTemplate(params).subscribe(res => {
      if (res.message == "success") {
        this.templateCode = res['code'];
        console.log("updateCode");
        this.aceEditor.session.setValue(this.templateCode);
      }
      else {
        alert("Failed to load template");
        this.templateCode = "";
        this.aceEditor.session.setValue(this.templateCode);
      }
    })
    this.isSideBarOpened = false;

  }


  resetTemplate() {
    if (!this.isProcessing) {
      this.aceEditor.session.setValue(this.templateCode);
    }
  }

  chooseLesson(sectionId:string, lessonIndex:number) {
    
    this.userProgressService.updateCurrentLesson(this.courseId,sectionId, lessonIndex).subscribe(res => {
      if (res.message == "success") {
        if (sectionId == this.sectionId) {
          this.userProgress = res.data;
          this.loadContents();
        }
        else {
          this.router.navigate([`coding/${this.courseId}/${sectionId}`]);
        } 
      }
      else {
        alert(res.message);
      }
    })
  }

  public setTheme(theme:string) {
    if(theme == 'light') {
      this.aceEditor.setTheme("ace/theme/tomorrow");
    }
    else {
      this.aceEditor.setTheme("ace/theme/tomorrow_night_eighties");
    }
  }

  public submitCode() {
    this.isProcessing = true;
    let body = {
      lang: "javascript",
      name: this.currentLesson.path,
      code: this.aceEditor.getValue(),
      course: this.courseId,
      section: this.sectionId,
      lesson: this.currentLesson._id
    }
    this.compilerService.submitCode(body).subscribe(res => {
      console.log(res);
      this.runMessage = res.runMessage;
      this.testMessage = res.testMessage;
      if (res.status == '0') {
        this.isFailedRun = false;
      }
      else {
        this.isFailedRun = true;
      }
      if (res.message == "success") {
        if (res.passed) {
          this.isPassedLesson = true;
          this.isPassedTest = true;
        }
        else {
          this.isPassedTest = false;
        }
      }
      else {
        this.isPassedTest = false;
        this.runMessage += "\n" + res.message;
      }

      this.isProcessing = false;
    })
  }

  openSideBar() {
    this.isSideBarOpened = true;
  }

  closeSideBar() {
    this.isSideBarOpened = false;
  }

  previousLesson() {
    if(this.currentLesson.currentIndex > 0) {
      this.userProgressService.updateCurrentLesson(this.courseId, this.sectionId, this.currentLesson.currentIndex.valueOf() -1).subscribe(res => {
        if (res.message == "success") {
          this.userProgress = res.data;
          this.loadContents();
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  nextLesson() {
    if (this.currentLesson.currentIndex < this.totalLessonsInSection - 1 ) {
      this.userProgressService.updateCurrentLesson(this.courseId, this.sectionId, this.currentLesson.currentIndex.valueOf() + 1).subscribe(res => {
        if (res.message == "success") {
          this.userProgress = res.data;
          this.loadContents();
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  nextSection() {
    if (this.sectionIndexCourse < this.course.sections.length -1) {
      let sectionId = this.course.sections[this.sectionIndexCourse + 1]._id;
      this.router.navigate([`coding/${this.courseId}/${sectionId}`])
    }
  }

  hasPreviousLesson() {
    if (this.currentLesson != undefined) {
      if(this.currentLesson.currentIndex > 0) {
        return true;
      }
    }
    return false;
  }

  hasNextLesson() {
    if (this.currentLesson != undefined && this.totalLessonsInSection) {

      if (this.currentLesson.currentIndex < this.totalLessonsInSection - 1 ) {
        return true;
      }
    }
    return false;
  }

  hasNextSection() {
    if (this.sectionIndexCourse != undefined && this.course && this.currentLesson && this.totalLessonsInSection) {
      if (this.currentLesson.currentIndex == this.totalLessonsInSection - 1 && this.sectionIndexCourse < this.course.sections.length) {
        return true;
      }
    }
    return false;
  }
}
