import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/'
import {UserDetail} from '../../models/'

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
export class AdminManageUsersComponent implements OnInit {

  usersList: UserDetail[];
  searchKeyword = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  getRequestParams(keyword, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (keyword) {
      params[`keyword`] = keyword;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  public loadUsers() {
    const params = this.getRequestParams(this.searchKeyword, this.page, this.pageSize);

    this.userService.getUsersWithPagination(params)
    .subscribe(res => {
      if (res['data']) {
        this.usersList= res['data']['users'];
        this.count = res['data']['totalItems'];
      }
    })
  }

  handlePageChange(event): void {
    this.page = event;
    this.loadUsers();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadUsers();
  }
}
