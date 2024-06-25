import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { jwtDecode } from "jwt-decode";
import { AuthService } from '../../services/auth.service';
const token = "YOURSECRETKEYGOESHERE";
@Component({
  selector: 'app-sidnav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule,RouterOutlet,MatListModule,MatIconModule,MatCardModule,
    RouterModule],
  templateUrl: './sidnav.component.html',
  styleUrl: './sidnav.component.css'
})
export class SidnavComponent implements OnInit {
  @Input() togglenav!:boolean
  drawerWidth: string = '50'
  role:any
authservece=inject(AuthService)
  showFiller = this.togglenav;
  ngOnInit(): void {
    console.log(this.togglenav);
    const decoded = jwtDecode(this.authservece.getToken()||'token');
console.log(typeof decoded)
if (typeof decoded === 'object' && 'role' in decoded) {
  console.log(decoded.role);
this.role=decoded.role
}}

}
