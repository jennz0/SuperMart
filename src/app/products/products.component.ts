import { Component } from '@angular/core';
import { Product } from './products';
import { PRODUCT } from '../mock-product';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { MessageService } from '../message.service';
// import { NgFor} from '@angular/common';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})

// @Component({
//   standalone: true,
//   imports: [
//     NgFor,
//   ],
// })

export class ProductsComponent {
  constructor(private productService: ProductService, private messageService: MessageService) {}

  products : Product[] = [];
  selectedProduct? : Product;

  onSelect(product: Product): void {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    this.messageService.add(`ProductsComponent: Selected product id=${product.id}`);
  }

  getProducts(): void {
    this.productService.getProducts()
        .subscribe((products_returned_from_service) => {
          this.products = products_returned_from_service;
          console.log(products_returned_from_service);});
  }

  ngOnInit() {
    this.getProducts();
  }

}
