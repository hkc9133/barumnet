import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiBaseUrl = `${environment.apiBaseUrl}/email/send`;

  constructor(private http: HttpClient) { }

  sendEmail(name: String, email: String, title: String, content: String): Observable<{}>{
    return this.http.post(`${this.apiBaseUrl}`,{
      "name" : name,
      "email" : email,
      "title" : title,
      "content" : content
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
      errorMessage = `Error Code: ${error.status} : ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
