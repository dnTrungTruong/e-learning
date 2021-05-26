import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/'
import {User} from '../../models/'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfoJWT()
    .subscribe((user: any) => {
      this.user.userdata = user;
    })
  }

}
