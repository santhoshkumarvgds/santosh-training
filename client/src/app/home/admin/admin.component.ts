import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../../assets/css/home.css'],
})
export class AdminComponent implements OnInit {
  loginStatus: boolean = false;
  render: string = '';
  constructor(private router:Router) {}

  async ngOnInit() {
    const response: any = await fetch('http://localhost:4000/user/getinfo', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body: any = await response.json();
    if (body.role = "Admin") {
      this.loginStatus = true;
      this.render = "product";
    } else if (body.role) {
      this.router.navigate([body.role.toLowerCase()]);
    } else {
      this.router.navigate(['/login']);
    }

  }

  logout() {
    let user = new LogoutComponent(this.router);
    user.logout();
  }

  handleClick(value: string): void {
    this.render = value;
  }
}
