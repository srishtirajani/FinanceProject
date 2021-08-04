import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  //changepass: FormGroup | undefined;
  constructor() {}
  ngOnInit(): void {
  }
  changePass=new FormGroup({
    pass:new FormControl("",[Validators.required,Validators.minLength(3)]),
    cpass:new FormControl("",[Validators.required,Validators.minLength(3)])
  })
  Change(){
    //alert('success');
    console.log(this.changePass.value);
  }
  
}
