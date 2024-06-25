import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ImgfullscreneComponent } from '../imgfullscrene/imgfullscrene.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { FileTypeService } from '../../services/file-type.service';
import { File_type } from '../../interfaces/file_type';
import { WorkService } from '../../services/work.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
export interface CustomFile extends File {
  url?: string;
}
@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    NgbTooltipModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent implements OnInit {
  selectedFiles: CustomFile[] = [];
  form!: FormGroup;
  users: User[] = [];
  file_types: File_type[] = [];

  selecteduserbyuser!: string;
  selectedfilebyuser!: string;
  contentchange!: string;
me:any
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private file_typeservice: FileTypeService,
    private workService: WorkService,
    private toastr: ToastrService
  ) {
    
  }
  ngOnInit(): void {
    const jsonString = localStorage.getItem('user'); // Replace 'yourKey' with the key under which the JSON data is stored
    if (jsonString) {
      // Parse JSON string into JavaScript object
      this.me = JSON.parse(jsonString).id;
    }
    this.form = this.formBuilder.group({
      files: [null,Validators.required],
      userID: ['',Validators.required],
      content: ['',Validators.required],
      fileID: ['',Validators.required],
    });

    this.userService.getAllUser().subscribe((res) => {
      this.users = res.users;
      this.users=this.users.filter(u=>u.id!=this.me)

    });
    this.file_typeservice.getall().subscribe((res) => {
      this.file_types = res.file_type;
    });  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
console.log(this.selectedFiles);
    this.form.get('files')?.setValue(this.selectedFiles);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles[i]['url'] = e.target.result;
      };
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }
  uploadFiles() {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }
  }
  openFullscreenImage(imageUrl: string | undefined): void {
    this.dialog.open(ImgfullscreneComponent, {
      width: '50vw',
      height: '100vh',
      panelClass: 'fullscreen-dialog',
      data: [imageUrl],
    });
  }
  openImage() {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      height: '500px',
      width: '600px',
      data: { images: this.selectedFiles },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onSubmit() {
    if(this.form.invalid){
      return
    }

    const me = localStorage.getItem('user');
    var sender_id;
    if (me != null) {
      sender_id = JSON.parse(me).id;
    }

    const form = new FormData();
    form.append('resever_id', this.form.get('userID')?.value.id);
    form.append('sender_id', sender_id);

    form.append('file_type_id', this.form.get('fileID')?.value.id);
    form.append('content', this.form.get('content')?.value);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      form.append('files', this.selectedFiles[i]);
    }
    this.workService.add(form).subscribe((res) => {
      this.form.reset();
      this.selecteduserbyuser = '';
      this.selectedfilebyuser = '';
      this.contentchange = '';
      this.selectedFiles = [];
      this.toastr.success('succes','',{progressAnimation:'increasing',progressBar:true,
      easing:'ease-in-out'
    });    });
  }
  selecteduser(e: any) {
    this.selecteduserbyuser = e.value.lastname + ' ' + e.value.firstname;
  }
  contentchang(e: any) {
    this.contentchange = e.target.value;
  }
  selectedfile(e: any) {
    this.selectedfilebyuser = e.value.libelle;
  }
}
