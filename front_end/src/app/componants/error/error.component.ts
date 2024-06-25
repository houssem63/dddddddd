import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [HttpClientModule,CommonModule ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorMessage!: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('/api/error').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}
