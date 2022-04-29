import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      mobile: [''],
      email: [''],
      password: [''],
    })
  }
  signUp() {
    this.http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res => {
      console.log('response--', res)
      alert('sign-Up Successfully');
      this.signupForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      alert("Something went wrong from server")
    })
  }

}
