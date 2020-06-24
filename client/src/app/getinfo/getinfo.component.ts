import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getinfo',
  templateUrl: './getinfo.component.html',
  styleUrls: ['../../assets/css/home.css'],
})
export class GetinfoComponent implements OnInit {
  name : string = ""
  email : string = "";
  role : string = "";
  constructor() {}

  async ngOnInit(){
    const response : any = await fetch('http://localhost:4000/user/getinfo', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body : any = await response.json();
    this.name = body.name;
    this.email = body.email;
    this.role = body.role;
  }
}
