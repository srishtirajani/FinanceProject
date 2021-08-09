import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService, Data } from 'src/app/services/admin.service';
import { ChangepasswordService } from 'src/app/services/changepassword.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  errorMessage!: string;
  message!: string;
  constructor(private changepassword:ChangepasswordService,private router: Router, private data: Data){}
  pno: string = ''
  ngOnInit(): void {
    this.changepassword.GetAllConsumers().subscribe(data=>{
      this.changepassword.consumers=data;
    });
    this.pno=this.data.storage;
    console.log(this.pno);
  } 
  login(loginForm: NgForm) {
    console.log(this.pno);
    console.log(this.changepassword.consumers);
    if (loginForm && loginForm.valid) {
      const password = loginForm.form.value.passwordVar;
      console.log(password);
      console.log(this.changepassword.getValues(this.pno,password))
      
    } else {
      this.errorMessage = 'Please enter a password.';
    }
  }
}