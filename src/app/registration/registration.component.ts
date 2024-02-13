import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private http: HttpClient, private router: Router) {}

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  register(username: string, password: string, email: string) {
    this.http.post<any>('http://localhost:8000/accounts/signup/', { username, password, email })
      .subscribe(response => {
        // Handle successful registration, maybe redirect to login page
        console.log(response);
        this.goToLogin();
      }, error => {
        // Handle registration error
        console.error(error);
      });
  }
}
