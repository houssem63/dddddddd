import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { MatIcon } from '@angular/material/icon';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

/*export interface Userinterface {
  id: string|number;
 firstname:string;
 lastname:string;
 username:string;
 userrole:string
}

const ELEMENT_DATA: Userinterface[] = [
  {id: 1, firstname: 'houssem', lastname: 'dakhli', username:'houssem636',userrole:'admin'},
  {id: 2, firstname: 'amin', lastname: 'dakhli', username:'houssem636',userrole:'admin'},
  {id: 3, firstname: 'houssem', lastname: 'mekni', username:'houssem636',userrole:'user'},
  
];*/
@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, NgbTooltipModule,
    MatTableModule,MatButtonModule,MatDialogModule,MatIcon],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{
  users:User[]=[]
  displayedColumns: string[] = ['id','firstname', 'lastname', 'username', 'userrole','actions'];
  dataSource : any;

constructor(public dialog: MatDialog,private userService :UserService){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openmodal(type:string,id=null){
    const dialogRef = this.dialog.open(AdduserComponent,{ height: type==='add'?'550px':'500',
    width: '600px',data:{type,id}} 
    );

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getAllUser().subscribe(res=>{
        this.users=res.users
        
        ;
        this.dataSource = new MatTableDataSource(this.users);
  
      })
    });
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(res=>{
      this.users=res.users
      
      this.dataSource = new MatTableDataSource(this.users);

    })
  }
  confirm(id:string){
    const dialogRef = this.dialog.open(ConfirmModalComponent,{ height: '200px',
    width: '300px'} 
    );

    dialogRef.afterClosed().subscribe(result => {
    
      if(result===true){
        this.userService.deleteUser(id).subscribe((res)=>{
            this.userService.getAllUser().subscribe(res=>{
        this.users=res.users
        ;
        this.dataSource = new MatTableDataSource(this.users);
  
      })
        })
      }
    
    });  }
  }

