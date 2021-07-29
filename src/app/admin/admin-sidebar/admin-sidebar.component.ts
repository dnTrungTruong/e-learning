import { Component, OnInit, Input } from '@angular/core';
import {Role} from '../../models';
import {CourseService} from '../../services/'
import { AuthenticationService } from '../../services/authentication.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import $ from 'jquery';
import { interval } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  selectedPage: string = '';
  Role = {
    Admin: Role.Admin,
    Moderator: Role.Moderator
  };
  pendingCoursesCount = 0;
  myInterval:any;

  @Input() userRole: string;


  constructor(
    private router: Router,
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        this.authenticationService.user.subscribe(userFromLocal => {
          if (userFromLocal && event.url.startsWith('/admin')) {
            
          }
        })
        
        //show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        let urlParts = window.location.href.split('/');
        
        this.selectedPage = urlParts[4];
        if (!urlParts[4]) this.selectedPage = '';
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        //console.log(event.error);
      }
      
    });

  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
    this.courseService.getPendingCoursesCount().subscribe((count:number) => {
      this.pendingCoursesCount = count;
    })
    
  }


  setSelected(page: string) {
    this.selectedPage = page;
  }
}
