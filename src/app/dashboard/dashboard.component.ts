import { Component, OnInit } from '@angular/core';
import { Product} from '../products/products';
import { ProductService } from '../product.service';
import { AuthService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: Product[] = [];
  products_1: Product[] = [];

  constructor(private productService: ProductService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    if (this.authService.isAdministrator()) {
      this.productService.popularProducts()
      .subscribe(products => this.products = products);
      this.productService.profitableProducts()
      .subscribe(products_1 => this.products_1 = products_1);
    } else {
      this.productService.frequentProducts().subscribe(products => this.products = products);
      this.productService.recentProducts().subscribe(products_1 => this.products_1 = products_1);
    }
    
  }
}
