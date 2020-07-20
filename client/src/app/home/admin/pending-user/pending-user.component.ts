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
  interval: number = 2;
  constructor() {}

  async changeInterval() {
    const response: any = await fetch(
      'http://localhost:400/user/changeinterval?interval=' + this.interval,
      {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    alert(data.message);
  }

  async acceptreject(email, status) {
     const response : any = await fetch('http://localhost:4000/user/acceptreject', {
       method: 'post',
       credentials: 'include',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         email: email,
         status: status,
       }),
     });
     const data :any = await response.json();
     if (data.status) {
       alert(email+" was "+data.status);
       this.values=this.values.filter((item) => item != email);
     } else {
       alert('Try again');
     }
  }

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
