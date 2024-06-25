import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { WorkService } from '../../services/work.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FromnowPipe } from '../../pipes/fromnow.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef,MatDialogModule } from '@angular/material/dialog';

import { PdfComponent } from '../pdf/pdf.component';
import { MatButtonModule } from '@angular/material/button';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatIcon } from '@angular/material/icon';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-work-histore',
  standalone: true,
  providers: [provideNativeDateAdapter()
    ],

  imports: [MatFormFieldModule,FromnowPipe ,
    MatInputModule,FormsModule, ReactiveFormsModule,
     MatCardModule, MatDividerModule,MatDatepickerModule,MatSelectModule,
     FormsModule,CommonModule,MatGridListModule,MatIcon,PdfViewerModule,MatDialogModule ,MatButtonModule],
  templateUrl: './work-histore.component.html',
  styleUrl: './work-histore.component.css',
  
})
export class WorkHistoreComponent implements OnInit{
  currentDate: Date = new Date();
  users:User[]=[]
  form!:FormGroup
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];
files:any[]=[]
showPdfViewer = false;
me:any
    constructor(public dialog: MatDialog,private userservice:UserService,
       private fb: FormBuilder,private workservice:WorkService){

}
ngOnInit(): void {
  const jsonString = localStorage.getItem('user'); // Replace 'yourKey' with the key under which the JSON data is stored
  if (jsonString) {
    // Parse JSON string into JavaScript object
    this.me = JSON.parse(jsonString).id;
  }
  console.log(this.me) 
  this.form =  new FormGroup({
  user:new FormControl(null,Validators.required),
  start:new FormControl<Date | null>(null),
  end:new FormControl<Date | null>(null)

  })
  this.userservice.getAllUser().subscribe((res)=>{
this.users=res.users
this.users=this.users.filter(u=>u.id!=this.me)
})
}
save(){
  console.log(this.form.value);
  this.workservice.searchFile(this.form.get('start')?.value,this.form.get('end')?.value,this.form.get('user')?.value?.id)
  .subscribe((res)=>{
    console.log(res);
    this.files=res.resulat
   this.files.forEach(f=>{
    f.paths=f.paths.split(',')
    f.types=f.types.split(',')
  }
  
  )
    console.log(this.files);
  })
}
togglePdfViewer() {
  this.showPdfViewer = !this.showPdfViewer;
}
openDialog(path:any): void {
  const dialogRef = this.dialog.open(PdfComponent, { width: '90vw',
  height: '100vh',
    data: {path},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
 
  });
}
downloadFile(filename:any) {
  this.workservice.downloadFile(filename);
}
openImage(url:any) {
  const table = url.map((row:any) => {
    return {
      url: row,
      
    };
  }); 

  const dialogRef = this.dialog.open(ImageModalComponent, {
    height: '500px',
    width: '600px',
    data: { images:table} 
  });

  dialogRef.afterClosed().subscribe((result) => {});
}
}
