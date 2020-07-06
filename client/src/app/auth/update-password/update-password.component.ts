import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: [
    '../../../assets/css/pending-approvel.css',
    '../../../assets/css/index.css',
  ],
})
export class UpdatePasswordComponent implements OnInit {
  password: string;
  path: any;
  hash: string;

  constructor() {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.path = window.location.href.split('/');
    this.hash = this.path[this.path.length - 1];
    const response: any = await fetch(
      'http://localhost:4000/user/updatepassword',
      {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: this.password,
          hashValue : this.hash
        }),
      }
    );
    const body: any = await response.json();
    alert(body.message);
  }

  ngOnInit(): void {}
}
