import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
interface signUpResponse {
  username: string;
}
interface signInResponse {
  authenticated:boolean;
  username: string;
}
interface signInData {
  username: string;
  password:string;
}
interface signInResponse{
  username:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignedin$ = new BehaviorSubject(null);
  username :string;
  constructor(private _http: HttpClient) { }

  availableUsernameCheck(username: string) {
    return this._http.post(environment.baseUrl + 'username', { username });
  }
  signUp(data: any) {
    return this._http.post<signUpResponse>(environment.baseUrl + 'signup', data).pipe(
      tap(({username}) => {
        this.isSignedin$.next(true);
        this.username = username
      })
    );
  }
  checkAuth() {
    return this._http.get<signInResponse>(environment.baseUrl + 'signedin').pipe(
      tap(({authenticated,username})=>{
        this.isSignedin$.next(authenticated);
        this.username = username;
      })
    );
  }
  signout() {
    return this._http.post<signInResponse>(environment.baseUrl+'signout', {}).pipe(
      tap(({username}) => {
        this.isSignedin$.next(false);
        this.username = username;
      })
    );
  }
  signIn(data:signInData){
    return this._http.post<signUpResponse>(environment.baseUrl + 'signin', data);
  }
}
