import { Component } from '@angular/core';
import { AuthService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperMart';
  current_user = '';

  constructor(public authService: AuthService,  private router: Router) {}

  goToRegistration() {
    this.router.navigateByUrl('/signup');
  }



}
