import { Injectable } from '@angular/core';
import Product from './model/Product';
import { HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private apiBaseUrl = `${environment.apiBaseUrl}/popup`;

  constructor(private http: HttpClient) { }

  getPopupStatus(): Observable<{}>{
    console.log(this.http.get(this.apiBaseUrl+'/isPopup'))
    return this.http.get(this.apiBaseUrl+'/isPopup')
                    .catch(this.errorHandler);
  }

  setPopupStatus(status: string): Observable<{}>{
    return this.http.post(this.apiBaseUrl+'/isPopup',{'status':status})
                    .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

}
