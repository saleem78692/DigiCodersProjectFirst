import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-circle-amlogin',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './circle-amlogin.html',
  styleUrl: './circle-amlogin.css',
})
export class CircleAMLogin {

  http = inject(HttpClient);
  router = inject(Router);

  // Circle AM Login Variables 
  circle_AM: string = "";
  amPassword: string = "";

  login(){
    if(this.circle_AM == "" || this.amPassword == ""){
      alert("Please fill all the fields");
      return;
  }

      const formdata=new FormData();
      formdata.append("circle_AM",this.circle_AM);
      formdata.append("amPassword",this.amPassword);

      const api="https://localhost:7205/api/Home/CircleAMLogin";

      this.http.post<any>(api,formdata).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem('circleAMuser',this.circle_AM);
          this.router.navigate(['/CircleAMDashboard']);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
        

}