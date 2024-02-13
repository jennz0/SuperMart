import { Component, Input } from '@angular/core';
import { Product } from '../products/products'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  // @Input() product?: Product;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location) {};
    product?: Product;
    
    ngOnInit(): void {
      this.getHero();
    }
    
    getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getProduct(id)
        .subscribe(product => this.product = product);
    }

    goBack(): void {
      this.location.back();
    }
}
