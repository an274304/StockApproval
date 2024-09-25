import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ApiUrl } from '../../core/Constant/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http : HttpClient) { 

  }


  // LogIn(Email:string, Password:string, isRemember:boolean){
  //   // Statically return values for testing purposes
  //   return of({
  //     token: 'sample-token-123456',
  //     userName: 'TestUser',
  //     userId: '12345',
  //     userRole: 'admin'
  //   });
  // }

  // For Api Hit
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
