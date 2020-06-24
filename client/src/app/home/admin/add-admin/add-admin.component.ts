import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: [
    '../../../../assets/css/pending-approvel.css',
    '../../../../assets/css/index.css',
  ],
})
export class AddAdminComponent implements OnInit {
  email: string = '';
  constructor() {}

  async handleSubmit(event : Event) {
    event.preventDefault();
    const response : any= await fetch('http://localhost:4000/user/addadmin', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
      }),
    });
    const body : any = await response.json();
    alert(body.message);
  }

  ngOnInit(): void {}
}
