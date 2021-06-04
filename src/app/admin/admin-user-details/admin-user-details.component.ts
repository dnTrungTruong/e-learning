import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/'
import {UserDetail} from '../../models/'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {

  user: UserDetail;
  userId: string;
  selectedRole: string;
  selectedStatus: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.getUserInfo(this.userId)
    .subscribe((user: UserDetail) => {
      if (!user) {
        return this.router.navigate(["/error/404"]);
      };
      this.user = user;
      this.selectedRole = user.role;
      this.selectedStatus = user.status;
    })
  }

  public goBack() {
    this.location.back();
  }

  public changeSelectedRole(role:string) {
    this.selectedRole = role;
  }

  public changeSelectedStatus(status:string) {
    this.selectedStatus = status;
  }

  public updateUserProfile() {
    let body = {
      role: this.selectedRole,
      status: this.selectedStatus
    };
    this.userService.editUserInfoForAdmin(this.user._id, body)
    .subscribe(res => {
      if (res.message == "success") {
        this.location.back();
      }
      else {
        alert(res.message);
      }
    })
  }
}
