import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FileTypeService } from '../../services/file-type.service';
import { File_type } from '../../interfaces/file_type';
import { AddfileTypeComponent } from '../addfile-type/addfile-type.component';
import { MatIcon } from '@angular/material/icon';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-file-type',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,NgbTooltipModule,MatButtonModule,MatDialogModule,MatIcon],
  templateUrl: './file-type.component.html',
  styleUrl: './file-type.component.css'
})
export class FileTypeComponent implements OnInit {
  file_types: File_type[]=[];
  constructor(private filetypeservice:FileTypeService,public dialog: MatDialog){}
  displayedColumns: string[] = ['id','libelle','actions'];
  dataSource : any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.filetypeservice.getall().subscribe((res)=>{
      console.log(res);
      this.file_types=res.file_type
      this.dataSource = new MatTableDataSource(this.file_types);
    })
  }
  openmodal(type:string,id=null){
    const dialogRef = this.dialog.open(AddfileTypeComponent,{ height: '300px',
    width: '600px',data:{type,id}} 
    );

    dialogRef.afterClosed().subscribe(result => {
      this.filetypeservice.getall().subscribe(res=>{
        this.file_types=res.file_type
        ;
        this.dataSource = new MatTableDataSource(this.file_types);
  
      })
    });
  }
  confirm(id:string){
    const dialogRef = this.dialog.open(ConfirmModalComponent,{ height: '200px',
    width: '300px'} 
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result===true){
        this.filetypeservice.deletefileType(id).subscribe((res)=>{
            this.filetypeservice.getall().subscribe(res=>{
        this.file_types=res.file_type
        ;
        this.dataSource = new MatTableDataSource(this.file_types);
  
      })
        })
      }
     
    });  }
}
