import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-branchdashboard',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './branchdashboard.html',
  styleUrl: './branchdashboard.css',
})
export class Branchdashboard {

  branch=localStorage.getItem('branch') || '';

}
