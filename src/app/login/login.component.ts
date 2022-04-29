import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signup").subscribe(res => {
      console.log('response--', res)
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email &&
          a.password === this.loginForm.value.password;
      })
      if (user) {
        alert('Login Successfully');
        this.loginForm.reset();
        this.router.navigate(['/medical']);
      } else {
        alert("User Not Found")
      }
    }, err => {
      alert("Something went wrong from server")
    })
  }

}
