import { Injectable } from '@angular/core';
import { Product } from './products/products';
import { Watchlist } from './watchlist/watchlist';
import { PRODUCT } from './mock-product';
import { Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private productsUrl = 'http://localhost:8000/api/v2/products/';  // URL to web api
  private watchlistUrl = 'http://localhost:8000/api/v2/watchlist/products/';  // URL to web api

  getProduct(id: number): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'), // Retrieve token from session storage
    });
    const url = `${this.productsUrl}${id}/`;
    return this.http.get<Product[]>(url, { headers }).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Product[]>(`getProduct id=${id}`))
    );
  }

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token') // Retrieve token from session storage
    });

    // Pass headers in the request
    return this.http.get<Product[]>(this.productsUrl, { headers })
      .pipe(
        tap(_ => this.log('fetched products')), // Log success
        catchError(this.handleError<Product[]>('getProducts', []))// Log error
      );
  }

  addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json' // Specify JSON content type
    });

    return this.http.post<Product>(this.productsUrl, product, { headers })
      .pipe(
        tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  getWatchlist(): Observable<Watchlist[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'), // Retrieve token from session storage
    });
    console.log(of(this.http.get<Watchlist[]>(this.watchlistUrl, {headers})));
    return this.http.get<Watchlist[]>(this.watchlistUrl, { headers })
    .pipe(
      tap(_ => this.log('fetched products'+ _)), // Log success
      catchError(this.handleError<Watchlist[]>('getWatchlist', []))// Log error
    );
  }

  addToWatchlist(product: Product): Observable<any> {
    // Assuming your backend API supports adding to watchlist
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'), // Retrieve token from session storage
    });
    return this.http.post<any>(this.watchlistUrl, product);
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
