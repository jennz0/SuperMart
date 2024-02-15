import { Component } from '@angular/core';
import { Product } from '../products/products';
import { ProductService } from '../product.service';
import { Watchlist } from './watchlist';
import { PlacedOrder } from '../order/placedOrder';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: Watchlist[] = [];
  watchlistProducts: Product[] = [];
  placedOrder: PlacedOrder = {
    id: 0,
    order: [],
  };


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getWatchlist();
  }

  ngOnChanges(): void {
    this.getWatchlist();
  }

  getWatchlist(): void {
    this.productService.getWatchlist().subscribe(
      watchlist => {
        this.watchlist = watchlist;
        for (const item of this.watchlist) {
          this.placedOrder.order.push({productId: item.product, quantity: 1});
          this.productService.getProduct(item.product).subscribe(
            product => {
              this.watchlistProducts.push(product[0]);
              console.log("Watchlist items:", this.watchlistProducts); // Logging here
            },
            error => {
              console.error('Error fetching product:', error);
            }
          );
        }
      },
      error => {
        console.error('Error fetching watchlist:', error);
      }
    );
  }

  placeOrder(): void {
    // Place order from watchlist
    this.productService.placeOrderFromWatchlist(this.placedOrder).subscribe(
      () => {
        console.log('Order placed successfully');
        // Clear watchlist after placing order
        this.clearWatchlist();
      },
      error => {
        console.error('Error placing order:', error);
      }
    );
  }

  clearWatchlist(): void {
    // Clear watchlist
    this.productService.clearWatchlist().subscribe(
      () => {
        console.log('Watchlist cleared successfully');
        // Refresh watchlist after clearing
        this.getWatchlist();
      },
      error => {
        console.error('Error clearing watchlist:', error);
      }
    );
  }
}
