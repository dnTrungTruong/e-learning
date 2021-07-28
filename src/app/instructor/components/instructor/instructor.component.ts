import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/'
import {User, Role} from '../../../models/'
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfoJWT()
    .subscribe((user: any) => {
      this.user.userdata = user;
    })
  }

}
