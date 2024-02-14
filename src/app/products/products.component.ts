import { Component } from '@angular/core';
import { Product } from './products';
import { PRODUCT } from '../mock-product';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { MessageService } from '../message.service';
import { AuthService } from '../authentication.service';
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
  constructor(private productService: ProductService, private messageService: MessageService, private authService: AuthService) {}

  products : Product[] = [];
  selectedProduct? : Product;
  showAddForm: boolean = false;
  newProduct: Product = {  // Initialize new product object
    id: 0,
    name: '',
    description: '',
    retail_price: 0,
    wholesale_price: 0,
    quantity: 0
  };

  userIsAdmin: boolean = false;

  checkAdmin(): void {
    this.userIsAdmin = this.authService.isAdministrator();
    console.log(this.userIsAdmin);
  }

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
    this.checkAdmin();
  }

  addProduct(): void {
    this.showAddForm = true; // Display the add product form
  }

  onSubmit(): void {
    this.productService.addProduct(this.newProduct)
      .subscribe(product => {
        this.products.push(product);
        this.resetForm(); // Reset the form after submission
        this.showAddForm = false; // Hide the add product form
      });
  }

  resetForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      retail_price: 0,
      wholesale_price: 0,
      quantity: 0
    };
  }




}
