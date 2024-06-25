import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FileTypeService } from '../../services/file-type.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-addfile-type',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule,ReactiveFormsModule,
    MatButtonModule,MatDialogModule,MatSelectModule],
  templateUrl: './addfile-type.component.html',
  styleUrl: './addfile-type.component.css'
})
export class AddfileTypeComponent {

  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddfileTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private filetypeservice:FileTypeService,private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      libelle: ['', Validators.required],
      
     
    
    });
    if (this.data.type === 'edit'){
this.filetypeservice.getOneTypeFile(this.data.id).subscribe((res)=>{
  console.log(res);
  this.form.setValue({
    libelle:res.typefile.libelle
  })
})
    }



  }

  onsubmit(){
    console.log('click');
    if(this.form.invalid) return;
    if(this.data.type==='edit'){
      this.filetypeservice.update(this.form.value,this.data.id).subscribe((res)=>{
        console.log(res);
  this.dialogRef.close()

      })
    }else{
      this.filetypeservice.add(this.form.value).subscribe((res)=>{
  console.log(res);
  this.dialogRef.close()
})
    }
console.log(this.form.value);

  }
}
