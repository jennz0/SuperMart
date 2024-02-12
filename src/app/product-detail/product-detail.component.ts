import { Component, Input } from '@angular/core';
import { Product } from '../products/products'; // Assuming the correct file path is '../models/product'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() product?: Product;
}
