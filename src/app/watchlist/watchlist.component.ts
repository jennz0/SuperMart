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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getWatchlist();
  }

  getWatchlist(): void {
    // Assuming you have a method in ProductService to retrieve watchlist
    this.productService.getWatchlist().subscribe(watchlist_returned_from_service => {this.watchlist = watchlist_returned_from_service;});
    console.log(this.watchlist);
  }

  placeOrder(): void {

  }
}
