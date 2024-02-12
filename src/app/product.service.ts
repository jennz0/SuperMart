import { Injectable } from '@angular/core';
import { Product } from './products/products';
import { PRODUCT } from './mock-product';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private messageService: MessageService) { }

  getProducts(): Observable<Product[]> {
    const products = of(PRODUCT);
    this.messageService.add('ProductService: fetched products');
    return products;
  }
}
