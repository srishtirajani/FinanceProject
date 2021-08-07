import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  errorMessage!: string;
  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      //const userEmail = loginForm.form.value.userEmail;
      const password = loginForm.form.value.passwordVar;
      //alert('Welcome..!!');
      //console.log( password);
      console.log(password);
    } else {
      this.errorMessage = 'Please enter a password.';
    }
  }
}