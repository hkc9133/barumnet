import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType,HttpHeaders } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiBaseUrl = `${environment.apiBaseUrl}/upload`;

  constructor(private httpClient: HttpClient) { }

  public upload(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': JSON.parse(sessionStorage.getItem("user"))
      })
    };

    return this.httpClient.post<any>(this.apiBaseUrl, data, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions.headers
    }).pipe(map((event) => {
      switch (event.type) {
  
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
  
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }


}