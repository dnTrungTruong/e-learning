import { Component, OnInit } from '@angular/core';
import { Course } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.css']
})
export class CardCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
