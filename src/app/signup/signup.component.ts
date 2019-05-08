import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
  }
    console.log(this.registerForm);

    const username = this.registerForm.value.username
    const password = this.registerForm.value.password

    // var result = {}
    var data = this.userService.login(username, password)
    data.subscribe((result: {}) => {

      sessionStorage.setItem("user", JSON.stringify(result));

      let user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user)


      window.location.href = 'index.html';
      // this.router.navigateByUrl('/')
    });
  }

}
