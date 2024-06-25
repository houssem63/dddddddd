import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.baseurl;

  private baseUrl = this.apiUrl+'/api/user';

  constructor(private http: HttpClient) { }
  getAllUser(){
    return this.http.get<{message:string,users:User[]}>(this.baseUrl + '/getalluser')
  }
  addUser(user:User){
    return this.http.post<{message:string,user:User,ok:boolean}>(this.baseUrl + '/adduser',user)
  }
  deleteUser(id:string){
    return this.http.delete<{message:string}>(this.baseUrl + `/deleteuser/${id}`,)
  }
  getOneUser(id:string){
    return this.http.get<{message:string,users:User}>(this.baseUrl + `/getoneuser/${id}`)
  }
  updateuser(user:User,id:string){
    return this.http.put<{message:string,users:User}>(this.baseUrl + `/updateuser/${id}`,user)
  }
}
