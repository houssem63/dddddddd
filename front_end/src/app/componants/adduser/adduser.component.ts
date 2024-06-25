import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ToastrService } from 'ngx-toastr';

export interface Role {
  back: string;
  front: string;
}
@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
})
export class AdduserComponent implements OnInit {
  roles: Role[] = [
    { back: 'admin', front: 'مسؤل' },
    { back: 'user', front: 'مستخدم بسيط' },
    // Add more roles as needed
  ];
  form!: FormGroup;
  mode!: string;
  constructor(
    public dialogRef: MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.mode = this.data.type;
    if (this.data.type === 'add') {
      this.initaddform();
    } else {
      this.initeditform();
      this.userService.getOneUser(this.data.id).subscribe((res) => {
        this.form.setValue({
          username: res.users.username,
          lastname: res.users.lastname,
          role: res.users.role,
          firstname: res.users.firstname,
          password:null
        });
      });
    }
  }
  onsubmit() {
    const user: User = this.form.value;
    if(this.form.invalid) return
    if (this.mode === 'edit') {
      console.log(this.form.value)
      this.userService.updateuser(user, this.data.id).subscribe((res) => {
        console.log('edit');

        this.dialogRef.close();
      });
    } else {
      this.userService.addUser(user).subscribe((res) => {
        console.log('add');
        if (res.ok) {
          this.dialogRef.close();
        } else {
          this.toastr.error(res.message, '', {
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'ease-in-out',
          });
        }
      });
    }
  }
  initaddform() {
    this.form = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      role: ['', Validators.required],

      username: ['', Validators.required],
      password: [
        '',
        [Validators.required] /*,[this.asyncPasswordValidator.bind(this)]*/,
      ],
    });
  }
  initeditform() {
    this.form = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      role: ['', Validators.required],
      password: [''],

      username: ['', Validators.required],
    });
  }
}
