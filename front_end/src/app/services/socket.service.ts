import { Injectable, inject } from '@angular/core';
import { io } from "socket.io-client";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
socket:any;
authservice=inject(AuthService)
  constructor() { }
  connect(){
    this.socket=io("http://localhost:3000", {
    query: { 'userid':this.authservice.getUserId()
  },
  });
  }

  getEvents(event:string): Observable<any> {
    console.log(event);
    return new Observable<any>(observer => {
      this.socket.on('newFiles', (data: any) => observer.next(data));
    });
  }
}
