import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      Login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  }
}
