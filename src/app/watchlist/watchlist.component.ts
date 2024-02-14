import { Component } from '@angular/core';
import { Product } from '../products/products';
import { ProductService } from '../product.service';
import { Watchlist } from './watchlist';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: Watchlist[] = [];
  watchlistProducts: Product[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getWatchlist();
  }

  getWatchlist(): void {
    this.productService.getWatchlist().subscribe(
      watchlist => {
        this.watchlist = watchlist;
        for (const item of this.watchlist) {
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

  }
}
