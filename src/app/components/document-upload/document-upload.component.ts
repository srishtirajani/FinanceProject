import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dbimg } from 'src/app/models/Dbimg';
import { Documents } from 'src/app/models/Document';
import { DocumentService } from 'src/app/services/document.service';
import { UploadImageService } from 'src/app/services/upload-image.service';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  documents:Documents[]=[];
  db:Dbimg= new Dbimg(0,"","");
  constructor(private imageService : UploadImageService,private docService : DocumentService) { 
    
  }
  fileToUpload: any;
  document:string="";
  blob:any;
  reader:any;
  url:any;
  flag:boolean=false;
  ngOnInit(): void {
    
  }
  handleFileInput(event:any) {
    this.fileToUpload = event.target.files.item(0);
    this.reader = new FileReader();
    this.reader.readAsDataURL(this.fileToUpload);
      this.reader.onload = () => {
      this.blob = new Blob(event.target.files, { type: event.target.files[0].type });
      this.url = window.URL.createObjectURL(this.blob);

  };
}



uploadFileToActivity(imgForm:NgForm) {
  if(this.fileToUpload!=null ){
  this.imageService.postFile(this.fileToUpload).subscribe(data => {
    }, error => {
      console.log(error);
    });
    this.flag=true;
  }
}

showDocs(){
  this.docService.GetAllDocuments().subscribe(data=>{
    this.documents=data;
  });
}

}
