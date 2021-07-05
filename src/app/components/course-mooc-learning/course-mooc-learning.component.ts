import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, AnnouncementService, AttemptService } from '../../services';
import { CourseDetails, Announcement, Comment, Lecture, Attempt } from '../../models';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-course-mooc-learning',
  templateUrl: './course-mooc-learning.component.html',
  styleUrls: ['./course-mooc-learning.component.css']
})
export class CourseMoocLearningComponent implements OnInit {

  course: CourseDetails;
  courseId: string;
  selectedLecture: Lecture;
  lectureUrl: string = `${environment.apiUrl}/file/s3/`
  player:any; 
  source:any; 
  announcementsList: Announcement[];
  reply: Boolean = false;
  userAttempt: Attempt;

  constructor(
    private courseService: CourseService,
    private announcementService: AnnouncementService,
    private attemptService: AttemptService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    
    //Maybe need to authorize here (Or use AuthGuard)
    courseService.getCourseLearningDetails(this.courseId)
    .subscribe((course: CourseDetails) => {
      if (!course) {
        return this.router.navigate(["/error/404"]);
      };
      this.loadAnnouncements();
      this.attemptService.getAttempt(this.courseId).subscribe((attempt: Attempt) => {
        this.userAttempt = attempt;
        console.log(this.userAttempt);
      })
      this.course = course;
      this.selectedLecture = course.sections[0].lectures[0];
      this.source = this.elRef.nativeElement.querySelector('source');
      this.source.src = this.lectureUrl + this.selectedLecture?.course + '/' + this.selectedLecture?.url;
      this.player = this.elRef.nativeElement.querySelector('video');
      this.player.load();
    })

   }

  ngOnInit(): void {
  }


  loadAnnouncements(): void {
    this.announcementService.getAnnouncements(this.courseId)
    .subscribe((announcements: Announcement[]) => {
      if(announcements.length) {
        this.announcementsList= announcements;
      }
    })
  }

  onSubmitComment(event: any, announcement: Announcement) {
    if (!event.target.commentTextArea.value) return alert("Comment must not be empty!");
    let body = {content: event.target.commentTextArea.value}
    this.announcementService.postComment(announcement._id.toString(), body)
      .subscribe(res => {
        if (res.message == 'success') {
          this.loadAnnouncements();
        }
        else {
          alert(res.message);
        }
      })
  }

  onSubmitReply(event: any, comment: Comment) {
    if (!event.target.replyTextInput.value) return alert("Reply must not be empty!");
    let body = {content: event.target.replyTextInput.value}
    this.announcementService.postReply(comment._id.toString(), body)
      .subscribe(res => {
        if (res.message == 'success') {
          this.loadAnnouncements();
        }
        else {
          alert(res.message);
        }
      })
  }
  
  changeLecture(lecture:Lecture) {

    this.selectedLecture = lecture;
    this.source.src = this.lectureUrl + this.selectedLecture?.course + '/' + this.selectedLecture?.url;
    
    this.player.load();
  }

  isPassedNonFinalQuizzes() {
    if (this.userAttempt) {
      for (let i = 0; i < this.userAttempt.quizzes.length; i++) {
        if (!this.userAttempt.quizzes[i].quiz.isFinal && !this.userAttempt.quizzes[i].isPassed) {
          console.log(this.userAttempt.quizzes[i].quiz);
          return false
        }
      }
    }
    
    return true;
  }

  isPassedQuiz(quizId: string) {
    if (this.userAttempt) {
      const index = this.userAttempt.quizzes.findIndex(function (quizzes) {
        return <any>quizzes.quiz._id == quizId;
      });
      if (this.userAttempt.quizzes[index].isPassed) {
        return true;
      }
      else return false;
    }
    
    return false;
  }

  public calculateTimeToCurrent(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds ago', 1], // 60
      [120, 'A minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes ago', 60], // 60*60, 60
      [7200, 'An hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours ago', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days ago', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'A week ago', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks ago', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'A month ago', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months ago', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'A year ago', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years ago', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'A century ago', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries ago', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      list_choice = 1;
  
    if (seconds === 0) {
      return 'just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      list_choice = 2;
    }
    var i = 0;
    var length = time_formats.length;
    var format;
    while (i < length) {
      format = time_formats[i++];
      if (seconds < format[0]) {
        if (typeof format[2] === 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1];
      }
    }
    return time;
  }

  public replyComment(commentId:string) {
    this.reply = true;
  }
}
