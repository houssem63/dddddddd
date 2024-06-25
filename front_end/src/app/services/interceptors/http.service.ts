import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


  export const HttpInterceptorService: HttpInterceptorFn = (req, next) => {
  
    const myToken = localStorage.getItem('token');
  
    const cloneRequest =  req.clone({
      setHeaders:{
        Authorization: `Bearer ${myToken}`
      }
    });
    return next(cloneRequest);
  };
