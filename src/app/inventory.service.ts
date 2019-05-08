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
export class InventoryService {
  private apiBaseUrl = `${environment.apiBaseUrl}/product`;

  constructor(private http: HttpClient) { }

  getInventory(page: number, searchItem: string, searchString: string): Observable<Product[]>{
    const  params = new  HttpParams().set('page', page.toString())
                                     .set('searchItem',searchItem)
                                     .set('searchString',searchString);
    return this.http.get<Product[]>(this.apiBaseUrl,{params})
                    .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

}
