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

  constructor(private productService: ProductService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    if (this.authService.isAdministrator()) {
      this.productService.popularProducts()
      .subscribe(products => this.products = products);
    } else {
      this.productService.frequentProducts().subscribe(products => this.products = products);
    }
    
  }
}
