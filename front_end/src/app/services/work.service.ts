import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {fileTypeFromFile} from 'file-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  apiUrl = environment.baseurl;

  private baseUrl = this.apiUrl+'/api/file';

  constructor(private http :HttpClient) { }
  add(form:FormData){
    console.log('FormData:', form.get('userID'));
   return this.http.post<{message:string,status:HttpResponse<any>}>(this.baseUrl+'/addfiles',form)
  }
  searchFile(start:string,end:string,userID:string){
    return this.http.get<{resulat:any[]}>(this.baseUrl+`/search?start=${start}&end=${end}&userID=${userID}`)
  }
  /*downloadFile(filePath:any): void {
    this.http
      .get(this.baseUrl+`/download/:${filePath}`, { responseType: 'blob' }) // Get the file as a Blob
      
      .subscribe((fileBlob) => {
        const fileName = 'downloaded_file.pdf'; // Default file name
        saveAs(fileBlob, fileName); // Save the file with FileSaver.js
      });
  }*/
  todayFiles(){
    return this.http.get<{resulat:any[]}>(this.baseUrl+`/todayFiles`)

  }
  downloadFile(filename:any) {

    // Replace 'http://localhost:3000/download' with the URL of your Node.js endpoint
    this.http.get(this.baseUrl+`/download/:${filename}`, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename+"."+filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);; // Replace 'filename.ext' with the name of your file
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
