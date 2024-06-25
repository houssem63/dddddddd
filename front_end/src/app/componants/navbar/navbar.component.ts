import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Output() Opensidenav : EventEmitter<any> = new EventEmitter();
  authService=inject(AuthService)
  socketservice=inject(SocketService)
  notifnumber=0
  notification:any=[]
emitevent(e:any){
  console.log("emited!");
this.Opensidenav.emit('toggle')
}
logout(){
  this.authService.logout()
}
ngOnInit(): void {
  this.socketservice.getEvents('newFiles').subscribe((data: any) => {
    // Handle the received message
    this.notification.push(data[0])
    console.log(this.notification)

    const notificationSound = document.getElementById('notificationSound') as HTMLAudioElement;
    console.log(notificationSound);
    this.notifnumber++
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
  
  });
}
resetnumber(){
  this.notifnumber=0
}
}
