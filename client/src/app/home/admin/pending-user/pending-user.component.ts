import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-user',
  templateUrl: './pending-user.component.html',
  styleUrls: [
    '../../../../assets/css/pending-approvel.css',
    '../../../../assets/css/home.css',
  ],
})
export class PendingUserComponent implements OnInit {
  values: any = [];
  constructor() {}

  async ngOnInit() {
    const response: any = await fetch(
      'http://localhost:4000/user/pendingapprovel',
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data: any = await response.json();
    for (var i: number = 0; i < data.emaillist.length; i++) {
      this.values.push(data.emaillist[i].email);
    }
  }
}
