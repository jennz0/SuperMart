import { Component } from '@angular/core';
import { Order } from './order';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: Order[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.productService.getOrders().subscribe(
      orders => {
        this.orders = orders;
        console.log('Orders:', this.orders);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // goToOrderDetail(): void {
  //   // Navigate to order detail component
  //   this.router.navigate(['/order-detail', orderId]);
  // }
}
