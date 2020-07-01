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

  async onSubmit(e:Event) {
     e.preventDefault();
       const response : any = await fetch('http://localhost:4000/user/signup', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           name: this.name,
           email: this.email,
           password: this.password,
           role: this.role,
         }),
       });
       const body :any = await response.json();
       if (body.message === 'Mail exists') {
         alert('Mail exists');
       } else if (body.message === 'success') {
         alert('Signup success');
    this.router.navigate(['/login']);
       } else {
         alert(body.message);
       }
  }

  ngOnInit(): void {
  }

}
