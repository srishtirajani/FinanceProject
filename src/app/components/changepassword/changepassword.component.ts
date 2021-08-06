import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  [x: string]: any;
  changePass!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }
  ngOnInit(): void {
    
    this.changePass=this.fb.group({
      pass:new FormControl("",[Validators.required,Validators.minLength(3)]),
      cpass:new FormControl("",[Validators.required,Validators.minLength(3)])
    },
    {validator: this.passwordMatchValidator})
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['pass'].value === frm.controls['cpass'].value ? null : {'mismatch': true};
  }
  
  Change(){
    //alert('success');
    console.log(this.changePass.value);
  }
  
}
