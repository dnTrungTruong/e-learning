import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services';
import { CourseDetails } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-online-learning',
  templateUrl: './course-online-learning.component.html',
  styleUrls: ['./course-online-learning.component.css']
})
export class CourseOnlineLearningComponent implements OnInit {

  course: CourseDetails;
  courseId: string;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getCourseLearningDetails(this.courseId)
    .subscribe((course: CourseDetails) => {
      if (!course) {
        return this.router.navigate(["/error/404"]);
      }
      this.course = course;
    })
  }

  public dateToUTCString(date: Date) {
    let dateObject = new Date(date);
    return dateObject.toUTCString();
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
}
