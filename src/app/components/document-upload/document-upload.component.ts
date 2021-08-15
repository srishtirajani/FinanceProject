import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dbimg } from 'src/app/models/Dbimg';
import { UploadImageService } from 'src/app/services/upload-image.service';
//import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  db:Dbimg= new Dbimg(0,"","");
  constructor(private imageService : UploadImageService) { }
  fileToUpload: any;
  document:string="";
  blob:any;
  reader:any;
  url:any;
  ngOnInit(): void {
    
  }
  handleFileInput(event:any) {
    this.fileToUpload = event.target.files.item(0);
    this.reader = new FileReader();
    this.reader.readAsDataURL(this.fileToUpload);
      this.reader.onload = () => {
      this.blob = new Blob(event.target.files, { type: event.target.files[0].type });
      this.url = window.URL.createObjectURL(this.blob);
      open(this.url)
      console.log(typeof(this.blob));
      console.log(this.url);
  };
}



uploadFileToActivity(imgForm:NgForm) {
  if(this.fileToUpload!=null ){
    this.db.ImageFile=this.url;
    //FileSaver.saveAs(this.blob,this.db.ImageFile);
    this.db.ImageName=imgForm.value.username;
    console.log(this.db);
  this.imageService.postFile(this.db).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
  }
}


}
