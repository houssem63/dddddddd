import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File_type } from '../interfaces/file_type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  apiUrl = environment.baseurl;

  private baseUrl = this.apiUrl+'/api/file_type';

  constructor(private http:HttpClient) { }
getall(){
  return this.http.get<{message:string,file_type:File_type[]}>(this.baseUrl+'/getall')
}
add(filetype:File_type){
 return this.http.post<string>(this.baseUrl+'/add',filetype)
}
deletefileType(id:string){
  return this.http.delete<{message:string}>(this.baseUrl + `/delete/${id}`)

}
getOneTypeFile(id:string){
  return this.http.get<{message:string,typefile:File_type}>(this.baseUrl + `/getone/${id}`)

}

update(filetype:File_type,id:string){
  return this.http.put<{message:string,filetype:File_type}>(this.baseUrl + `/update/${id}`,filetype)
}
}
