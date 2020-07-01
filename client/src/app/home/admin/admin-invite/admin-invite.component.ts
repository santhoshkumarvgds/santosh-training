import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-invite',
  templateUrl: './admin-invite.component.html',
  styleUrls: [
    '../../../../assets/css/pending-approvel.css',
    '../../../../assets/css/index.css',
  ],
})
export class AdminInviteComponent implements OnInit {
  invite: boolean = false;
  email: string;
  password: string;
  name: string;
  path;
  hash;
  constructor(private router: Router) {}

  async inviteCheck() {
    this.path = window.location.href.split('/');
    this.hash = this.path[this.path.length - 1];
    const response: any = await fetch(
      'http://localhost:4000/user/invitecheck',
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hash: this.hash,
        }),
      }
    );
    const data: any = await response.json();
    if (data.status == 'success') {
      this.invite = true;
      this.email = data.email;
    } else {
      alert('Not valid!!');
    }
  }

  async submit(e: Event) {
    e.preventDefault();
    const response: any = await fetch(
      'http://localhost:4000/user/inviteaccept',
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          name: this.name,
          password: this.password,
        }),
      }
    );
    const data: any = await response.json();
    if (data.status) {
      alert('success');
      this.router.navigate(['/login']);
    } else {
      alert('Try again');
    }
  }

  ngOnInit(): void {
    this.inviteCheck();
  }
}
