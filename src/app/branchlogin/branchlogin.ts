import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-branchlogin',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './branchlogin.html',
  styleUrls: ['./branchlogin.css'],
})
export class Branchlogin {
  http = inject(HttpClient);
  router=inject(Router)
  branch: string = '';
  password: string = '';

  onSubmit() {
    if (this.branch && this.password) {

      const formdata = new FormData();
      formdata.append('branch', this.branch);
      formdata.append('password', this.password);

      const api = 'https://localhost:7205/api/Home/BranchLogin';

      this.http.post(api, formdata).subscribe({
        next: (res) => {
         localStorage.setItem('branch', this.branch);
          console.log(res);
          alert('Login Successful');
          this.router.navigate(['/branchdashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Login Failed');
        }
      });
    }
  }
}

