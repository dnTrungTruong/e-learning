import { Component, OnInit, Input } from '@angular/core';
import { CourseDetails, Announcement, Comment } from '../../../models/'
import { CourseService, AnnouncementService } from '../../../services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as CustomEditor from '../../../ckeditor5-custom-build';

@Component({
  selector: 'app-instructor-course-announcements',
  templateUrl: './instructor-course-announcements.component.html',
  styleUrls: ['./instructor-course-announcements.component.css']
})
export class InstructorCourseAnnouncementsComponent implements OnInit {

  @Input() courseId: string;
  @Input() course: CourseDetails;

  announcementsList: Announcement[];
  reply: Boolean = false;
  noResult:Boolean = false;
  isSubmitted: Boolean = false;

  announcementForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  public Editor = CustomEditor;
  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'underline', 'link', '|',
      'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeblock', '|',
      'insertTable', '|',
      'undo',
      'redo'
    ],
    codeBlock: {
      languages: [
        { language: 'code', label: 'Code' },
        { language: 'html', label: 'HTML' }
      ]
    },
    //
    language: 'en'
  };

  constructor(
    private router: Router,
    private announcementService: AnnouncementService,

  ) { }

  ngOnInit(): void {
    this.loadAnnouncements();

  }

  get title() { return this.announcementForm.get('title'); }
  get content() { return this.announcementForm.get('content'); }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements(this.courseId)
    .subscribe((announcements: Announcement[]) => {
      if(announcements.length) {
        this.announcementsList= announcements;
      }
      else {
        this.noResult = true;
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

  onSubmit() {
    this.isSubmitted = true;
    if (!this.announcementForm.invalid) {
      let body = {
        title: this.title.value,
        content: this.content.value,
        course: this.courseId,

      }
      this.announcementService.postAnnouncement(body).subscribe(res => {
        if (res.message == "success") {
          this.loadAnnouncements();
        }
        else {
          alert(res.message);
        }
      })
    }
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
