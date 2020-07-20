import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/index.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private router: Router) {}

  async onLogin() {
    const response : any = await fetch('http://localhost:4000/user/login', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });
    const body : any  = await response.json();
    if (body.message === 'success' && body.role === 'User') {
      this.router.navigate(['/user']);
    } else if (body.message === 'success' && body.role === 'Admin') {
      this.router.navigate(['/admin']);
    } else if (body.message === 'success' && body.role === 'Seller') {
      this.router.navigate(['/seller']);
    } else if (
      body.message === 'Approvel pending' &&
      body.status !== 'Reject'
    ) {
      this.router.navigate(['/pendingapprovel']);
    } else if (
      body.message === 'Approvel pending' &&
      body.status === 'Reject'
    ) {
      alert("You're rejected by Admin!!!");
    } else {
      alert(body.message);
    }
  }

  ngOnInit(): void {}
}
