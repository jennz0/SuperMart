import { Injectable } from '@angular/core';
import { Product } from './products/products';
import { PRODUCT } from './mock-product';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private productsUrl = 'http://localhost:8000/api/v2/products/';  // URL to web api

  getProduct(id: number): Observable<Product> {
    const product = PRODUCT.find(h => h.id === id)!;
    this.messageService.add(`ProductService: fetched product id=${id}`);
    return of(product);
    
  }

  getProducts(): Observable<Product[]> {
    const products = of(PRODUCT);
    this.messageService.add('ProductService: fetched products');
    return products;
    return this.http.get<Product[]>(this.productsUrl);
  }

  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
}
