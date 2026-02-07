import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {

  http=inject(HttpClient);
  router =inject(Router);

  //Admin Login Variables
  email:string="";
  password:string="";
  showPassword:boolean=false;
  rememberMe:boolean=false;
  isLoading:boolean=false;
  loginError:string="";

  togglePasswordVisibility():void {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.email == "" || this.password == "") {
      this.loginError = "Please fill all the fields";
      return;
    }

    this.isLoading = true;
    this.loginError = "";

    const api = "https://localhost:7205/api/Home/AdminLogin";

    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(api, body).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        if (res.status === "Success") {
          this.loginError = "";
          localStorage.setItem('adminEmail', this.email);
          localStorage.setItem('adminData', JSON.stringify(res.data));
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.loginError = res.msg || "Invalid email or password";
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.loginError = "Invalid email or password";
      }
    });
  }
}