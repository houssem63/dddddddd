import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFile } from '../work/work.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [NgbCarouselModule,PdfViewerModule,CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css'
})
export class ImageModalComponent {
	images:CustomFile[] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: {images: any[]}) {
    this.images=data.images
    console.log(data);
   }
   searchWordInText() {
    // Check if the search text is found in the text
    return this.images[0].url?.includes('pdf')
  }
}
