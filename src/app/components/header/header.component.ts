import { Component, OnInit } from '@angular/core';
import { User, Role, Notification } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';
import { CourseService, NotificationService } from '../../services/';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: User;
  isCollapsed = false;
  notificationsList: Notification[];
  noNotifications: Boolean = false;
  unCheckedNotifications: string[] = [];

  
  constructor(
    private authenticationService: AuthenticationService,
    private courseService: CourseService,
    private notificationService: NotificationService,
    private router:Router
  ) {
      this.authenticationService.user.subscribe(x => {
        this.user = x
        this.loadNotifications();
      });
  }

  get isAdmin() {
    if (this.isLoggedIn) {
      return this.user && this.user.userdata.role === Role.Admin;
    }
    return false;
  }

  get isModerator() {
    if (this.isLoggedIn) {
      return this.user && this.user.userdata.role === Role.Moderator;
    }
    return false;
  }

  get isLoggedIn() {
    return (this.user != null);
  }

  logout() {
    this.authenticationService.logout();
  }

  // updateSearchString(value) {
  //   this.courseService.changeKeyWord(value);
  // }

  navigateSearch(value) {
    if (value) {
      this.courseService.changeKeyWord(value);
      this.router.navigate(["search"])
    }
    else {
      //If input is null then navigate to home (Not a good way, need update)
      this.router.navigate([""])
    }
    
  }
  ngOnInit(): void {
    if (this.user) {
      interval(100000).subscribe(x => {
        this.loadNotifications();
      });
    }
    
    
  }

  public checkNotification() {
    for (let i = this.unCheckedNotifications.length - 1; i >= 0; i--) {
      this.notificationService.putChecked(this.unCheckedNotifications[i])
      .subscribe(res => {
        if (res.message == "success") {
          this.unCheckedNotifications.splice(i, 1);
        }
      })
    }
  }

  public goToNotificationTarget(notification: Notification) {
    if (notification.action == this.notificationService.notificationActions.POST_ANNOUNCEMENT) {
      this.router.navigate([`course/learning/${notification.target.course.type}/${notification.target.course._id}`])
    }
    if (notification.action == this.notificationService.notificationActions.POST_REVIEW) {
      this.router.navigate([`course/${notification.target.course._id}`])
    }
  }

  public loadNotifications() {
    if (this.user) {
      this.notificationService.getNotifications()
      .subscribe((notifications: Notification[]) => {
        if (notifications) {
          this.noNotifications = false;
          for (let notification of notifications) {
            if (notification.users[0].checked == false) {
              this.unCheckedNotifications.push(notification._id.toString())
            }
          }
          this.notificationsList = notifications;
        }
        else {
          this.noNotifications = true;
          this.notificationsList = undefined;
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
}