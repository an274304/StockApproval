import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMaster } from '../../core/Models/UserMaster';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiUrl } from '../../core/Constant/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http : HttpClient) { 

  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  LogIn(Email:string, Password:string, isRemember:boolean){
    return this.http.post<{token:string, userName:string, userId:string, userRole:string}>(`${ApiUrl.baseApiUrl}${ApiUrl.auth.AUTH}`,
      {
        email:Email,
        password:Password,
        isRemember:isRemember
      }
    );
  }
}
