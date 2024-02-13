import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http.post<any>('http://localhost:8000/accounts/token/', { username, password })
      .subscribe(response => {
        const token = response.token;
        console.log("token: " + token);
        sessionStorage.setItem('token', token);
        // Redirect to some authenticated route
        this.router.navigateByUrl('/dashboard');
      }, error => {
        // Handle login error
      });
  }

  logout() {
    sessionStorage.removeItem('token');
    // Redirect to login page
    this.router.navigateByUrl('/login');
  }

  
  isAuthenticated(): boolean {
    if (typeof sessionStorage != 'undefined') {
      console.log("current token: " + sessionStorage['token']);
      return !!sessionStorage.getItem('token');
    }
    return false;
  }
}
