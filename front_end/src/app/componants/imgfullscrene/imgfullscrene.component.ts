import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-imgfullscrene',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './imgfullscrene.component.html',
  styleUrl: './imgfullscrene.component.css',
})
export class ImgfullscreneComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:  [imageUrl: string] ) {

console.log(data);


   }
  
  slides = [
    'https://via.placeholder.com/600x300',
    'https://via.placeholder.com/600x300',
    'https://via.placeholder.com/600x300',
    'https://via.placeholder.com/600x300'
  ];

  }
