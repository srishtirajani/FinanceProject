import { ElementRef } from '@angular/core';
import { AfterViewInit, Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements AfterViewInit{
  @ViewChild('viewer') viewerRef:ElementRef | undefined;
  ngAfterViewInit(): void {
    WebViewer({
      path: '../assets/lib',
      initialDoc:'../assets/tnc/standard-terms-and-conditions.pdf'
    },this.viewerRef?.nativeElement).then(instance=>{

    })
  }

}
