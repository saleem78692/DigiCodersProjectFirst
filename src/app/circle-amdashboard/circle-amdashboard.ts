import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-circle-amdashboard',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './circle-amdashboard.html',
  styleUrl: './circle-amdashboard.css',
})
export class CircleAMDashboard {

  http=inject(HttpClient);
  router=inject(Router);

  circleAMUser:string=localStorage.getItem('circleAMuser') || '';
  

}
