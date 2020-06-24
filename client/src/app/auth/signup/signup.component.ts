import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/index.css']
})
export class SignupComponent implements OnInit {
  name : string ="";
  email : string ="";
  password : string ="";
  role : string ="Select";

  constructor(private router:Router) { }

  onSubmit() : void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
