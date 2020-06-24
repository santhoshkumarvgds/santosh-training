import { Component, OnInit , Input } from '@angular/core';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../assets/css/home.css'],
})
export class UserComponent implements OnInit {
  loginStatus: boolean = false;
  render: string = 'product';
  constructor(private router: Router) {}

  async ngOnInit(){
    const response: any = await fetch('http://localhost:4000/user/getinfo', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body: any = await response.json();
    console.log(body.role);
    if (body.role = "User" ) {
      this.loginStatus = true;
      this.render = 'product';
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
