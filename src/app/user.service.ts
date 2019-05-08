import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = `${environment.apiBaseUrl}/auth/`;

  constructor(private http: HttpClient) { }

  login(userId: String, password: String): Observable<{}>{
    return this.http.post(`${this.apiBaseUrl}login`,{
      "username" : userId,
      "password" : password
    }).catch(this.errorHandler);
  }

  check(): Observable<{}>{

    let user = JSON.parse(sessionStorage.getItem("user"));
    
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-access-token': user.token
    });

    return this.http.get(`${this.apiBaseUrl}check`,{headers: httpHeaders
    }).catch(this.errorHandler);
  }
  
  errorHandler(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(`Error: ${error.error.message}`)
      errorMessage = `Error Code: ${error.status}\nMessage: 일치하는 정보가 없습니다.`;
    }
    sessionStorage.clear();
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
