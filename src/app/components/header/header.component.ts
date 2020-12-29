import { Component, OnInit } from '@angular/core';
import { User, Role } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: User;
  isCollapsed = false;

  constructor( private authenticationService: AuthenticationService ) {
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

  ngOnInit(): void {
  }

}