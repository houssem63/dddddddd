import { Component, OnInit, inject } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FromnowPipe } from '../../pipes/fromnow.pipe';
import { CommonModule } from '@angular/common';
import { CustomFile } from '../work/work.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { PdfComponent } from '../pdf/pdf.component';
import { WorkService } from '../../services/work.service';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [ MatCardModule, MatDividerModule,MatIcon,FromnowPipe,CommonModule,MatButtonModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
  socketservice=inject(SocketService)
  workservice=inject(WorkService)

files:any[]=[]

   
    constructor( private dialog: MatDialog,) {
  
}
ngOnInit(): void {
  console.log('acceil');
  this.workservice.todayFiles().subscribe((res)=>{ console.log(res)
    res.resulat.forEach((el:any) => {
    console.log(el.paths)

      el.paths=el.paths.split(',')
      el.types=el.types.split(',')

     }); 
    this.files=res.resulat
    console.log(this.files)
    
  })
  this.socketservice.getEvents('newFiles').subscribe((data: any) => {
    // Handle the received message
    console.log(data)
    const notificationSound = document.getElementById('notificationSound') as HTMLAudioElement;
    console.log(notificationSound);
    if (notificationSound.paused) {
      // Play the audio
      notificationSound.play()
        .then(() => {
          // Audio playback started successfully
          console.log('Notification sound played');
        })
        .catch((error) => {
          // Unable to play audio, handle error
          console.error('Error playing notification sound:', error);
        });
    }
   data.forEach((el:any) => {
    console.log(el.paths)
    el.paths=el.paths.split(',')
    el.types=el.types.split(',')

   }); 
    this.files.push(data[0])

    console.log(this.files);
  });
}
open(path:any){
 path= path.map((f:any)=>{
  return {url:f}})
 console.log(path);

  var images:any=path;
 
  
  const dialogRef = this.dialog.open(ImageModalComponent, {
    height: '500px',
    width: '600px',
    data: { images },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}
openDialog(path:any){
  const dialogRef = this.dialog.open(PdfComponent, { width: '90vw',
  height: '100vh',
    data: {path},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
 
  });
}
downloadFile(filename:any) { console.log(filename)
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
