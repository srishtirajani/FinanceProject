import { Component, ElementRef, OnInit } from '@angular/core';
import { AfterViewInit,  ViewChild, ViewRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-terms-index',
  templateUrl: './terms-index.component.html',
  styleUrls: ['./terms-index.component.css']
})
export class TermsIndexComponent implements AfterViewInit{
  @ViewChild('viewer') viewerRef:ElementRef | undefined;
  ngAfterViewInit(): void {
    WebViewer({
      path: '../assets/lib',
      initialDoc:'../assets/tnc/standard-terms-and-conditions.pdf'
    },this.viewerRef?.nativeElement).then(instance=>{

    })
  }

}
