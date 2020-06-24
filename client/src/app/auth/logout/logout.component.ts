import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  async logout() {
    const response = await fetch('http://localhost:4000/user/logout', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const body = await response.json();
    if (body.status) {
      this.router.navigate(['/login']);
    } else {
      alert('logout failed');
    }
  }
}
