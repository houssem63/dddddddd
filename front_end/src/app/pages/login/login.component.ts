import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../../componants/alert/alert.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../interfaces/alert';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    AlertComponent,
    NgbAlertModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  hide = true;

  showAlert: boolean = false;
  alerts: Alert={type:"success",message:""};

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private authservice: AuthService,private router: Router) {
    this.form = this.fb.group({
      // Define your form controls here
      // For example:
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required] /*,[this.asyncPasswordValidator.bind(this)]*/,
      ],
    });
  }
  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
      this.authservice.login(formData.username, formData.password).subscribe(
        (response) => {
          // Handle successful login if needed
          console.log('Login successful:', response);
          console.log(this.alerts);
          this.alerts!.message = response?.message;
          this.alerts!.type = 'success';
          console.log(this.alerts);
          this.router.navigate(['/home'])
        },
        (error) => {
          // Display error message to the user
          console.log(error.error.error);
          this.alerts!.message = error.error.error;
          this.alerts!.type = 'danger';
        }
      );
    }
  }
  close() {}
  asyncPasswordValidator(control: AbstractControl): Promise<any> {
    return new Promise((resolve, reject) => {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/;
      if (passwordRegex.test(control.value)) {
        resolve(null); // Validation passed
      } else {
        resolve({ invalidPassword: true }); // Validation failed
      }
    });
  }
}
