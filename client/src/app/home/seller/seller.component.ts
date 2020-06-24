import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from '../../auth/logout/logout.component';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['../../../assets/css/home.css'],
})
export class SellerComponent implements OnInit {
  loginStatus: boolean = false;
  render: string = '';
  constructor(private router: Router) {}

  async ngOnInit() {
    const response: any = await fetch('http://localhost:4000/user/getinfo', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body: any = await response.json();
    if ((body.role = 'Seller')) {
      this.loginStatus = true;
      this.render = "product";
    }else if (body.role) {
      this.router.navigate([body.role.toLowerCase()]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    let user = new LogoutComponent(this.router);
    user.logout();
  }

  handleClick(a: string) {
    this.render = a;
  }
}
