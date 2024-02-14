import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private currentUser: any;

  getCurrentUser() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      this.currentUser = decodedJwtData;
      console.log(this.currentUser);
      return this.currentUser;
    }
    return null;
  }

  login(username: string, password: string) {
    this.http.post<any>('http://localhost:8000/accounts/token/', { username, password })
      .subscribe(response => {
        const token = response.access;
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
    if (typeof sessionStorage !== 'undefined') {
      // console.log("current token: " + sessionStorage['token']);
      return !!sessionStorage.getItem('token');
    }
    return false;
  }

  isAdministrator(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      const jwt = sessionStorage.getItem('token');
      if (jwt) {
        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        let isAdmin = decodedJwtData.user_id;
        return isAdmin == 1;
      }
      return false;
    }
    return false;
  }
}
