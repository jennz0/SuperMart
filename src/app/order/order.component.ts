import { Component } from '@angular/core';
import { Order } from './order';
import { ProductService } from '../product.service';
import { AuthService } from '../authentication.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: Order[] = [];

  constructor(private productService: ProductService,
              public authService : AuthService) { }

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

  cancelOrder(order: Order): void {
    order.order_status = 'Cancelled';
    // this.productService.cancelOrder(order.id).subscribe(
    //   updatedOrder => {
    //     order.order_status = 'Cancelled';
    //     console.log('Order Cancelled:', updatedOrder);
    //   },
    //   error => {
    //     console.error('Error cancelling order:', error);
    //   }
    // );
  }

  completeOrder(order: Order): void {
    order.order_status = 'Completed';
    // this.productService.cancelOrder(order.id).subscribe(
    //   updatedOrder => {
    //     order.order_status = 'Cancelled';
    //     console.log('Order Cancelled:', updatedOrder);
    //   },
    //   error => {
    //     console.error('Error cancelling order:', error);
    //   }
    // );
  }

  // goToOrderDetail(): void {
  //   // Navigate to order detail component
  //   this.router.navigate(['/order-detail', orderId]);
  // }
}
