import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    '../../../assets/css/pending-approvel.css',
    '../../../assets/css/index.css',
  ],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  constructor() {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    const response: any = await fetch('http://localhost:4000/user/forgotpassword', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
      }),
    });
    const body: any = await response.json();
    alert(body.message);
  }

  ngOnInit(): void {}
}
