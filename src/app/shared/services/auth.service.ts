import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

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
    // Statically return values for testing purposes
    return of({
      token: 'sample-token-123456',
      userName: 'TestUser',
      userId: '12345',
      userRole: 'admin'
    });
  }

  //// For Api Hit
  // LogIn(Email:string, Password:string, isRemember:boolean){
  //   return this.http.post<{token:string, userName:string, userId:string, userRole:string}>(`${ApiUrl.baseApiUrl}${ApiUrl.auth.AUTH}`,
  //     {
  //       email:Email,
  //       password:Password,
  //       isRemember:isRemember
  //     }
  //   );
  // }
}
