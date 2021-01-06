import { Component, OnInit } from '@angular/core';
import { User, Role } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: User;
  isCollapsed = false;

  constructor(
    private authenticationService: AuthenticationService,
    private courseService: CourseService,
    private router:Router
  ) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
    return this.user && this.user.userdata.role === Role.Admin;
  }

  get isLoggedIn() {
    return (this.user != null);
  }

  logout() {
    this.authenticationService.logout();
  }

  updateSearchString(value) {
    this.courseService.changeKeyWord(value);
  }

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
  }

}