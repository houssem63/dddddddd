import { Component, OnInit, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../componants/navbar/navbar.component';
import { FooterComponent } from '../../componants/footer/footer.component';
import { SidnavComponent } from '../../componants/sidnav/sidnav.component';
import { ErrorComponent } from '../../componants/error/error.component';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,SidnavComponent,ErrorComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @Output() toggle:boolean=true
socketservice=inject(SocketService)

tooglesidenav(e:any){
  console.log(e);
  this.toggle=!this.toggle
  console.log(this.toggle);
}
ngOnInit(): void {
  this.socketservice.connect()
}
}
