import { Component } from '@angular/core';
import { OrderItem } from './order-detail';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  orderItems: OrderItem[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.getOrderItems(orderId);
  }

  getOrderItems(orderId: number): void {
    this.productService.getOrderItems(orderId).subscribe(
      orderItems => {
        this.orderItems = orderItems;
        console.log('Order Items:', this.orderItems);
      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }
}
