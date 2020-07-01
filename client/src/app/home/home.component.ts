import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from '../auth/logout/logout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/css/home.css'],
})
export class HomeComponent implements OnInit {
  loginStatus: boolean = false;
  render: string = '';
  role: string = '';
  path:any ;
  roleCheck: string ;
  constructor(private router: Router) {}

  async ngOnInit() {
    this.path = window.location.href.split('/');
    this.roleCheck = this.path[this.path.length - 1];
    this.roleCheck == "user" ? this.render = 'product' : "";
    const response: any = await fetch('http://localhost:4000/user/getinfo', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body: any = await response.json();
    this.role = body.role;
    console.log(body.role);
    if (body.role.toLocaleLowerCase() == this.roleCheck) {
      this.loginStatus = true;
      this.render = 'product';
    } else {
      this.router.navigate([body.role.toLocaleLowerCase()]);
    }
  }

  logout() {
    let user = new LogoutComponent(this.router);
    user.logout();
  }

  handleClick(a: string): void {
    this.render = a;
  }
}
