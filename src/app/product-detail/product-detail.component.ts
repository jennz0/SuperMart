import { Component, Input } from '@angular/core';
import { Product } from '../products/products'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';
import { AuthService } from '../authentication.service';
import { Watchlist } from '../watchlist/watchlist';
import { WatchlistAdd } from '../watchlist/watchlistAdd';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  // @Input() product?: Product;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private authService: AuthService) {};
    product?: Product;

    newWatchlistItem: WatchlistAdd = {  // Initialize new product object
      id: 0,
      productId: 0,
    };
    
    userIsAdmin: boolean = false;

    checkAdmin(): void {
      this.userIsAdmin = this.authService.isAdministrator();
      console.log(this.userIsAdmin);
    }

    ngOnInit(): void {
      this.getHero();
    }

    ngOnChanges(): void {
      this.getHero();
    }
    
    getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getProduct(id)
        .subscribe((product_returned_from_service) => {
          this.product = product_returned_from_service[0];
          console.log(this.product)});
    }

    goBack(): void {
      this.location.back();
    }

    addToWatchlist(): void {
      if (this.newWatchlistItem) {
        if (this.product) {
          this.newWatchlistItem.productId = this.product.id;
        }
        this.productService.addToWatchlist(this.newWatchlistItem).subscribe();
      }
      
    }
}
