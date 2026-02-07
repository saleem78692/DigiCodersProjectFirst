import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circle-amalldata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circle-amalldata.html',
  styleUrls: ['./circle-amalldata.css'],
})
export class CircleAMALLData implements OnInit {

  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // 🔥 IMPORTANT

  circleAMData: CircleAMData[] = [];
  CircleAM: string = localStorage.getItem('circleAMuser') || '';
  searchText: string = '';

  get filteredData(): CircleAMData[] {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.circleAMData;
    return this.circleAMData.filter((it) => {
      return (
        (it.branch || '').toLowerCase().includes(q) ||
        (it.city || '').toLowerCase().includes(q) ||
        (it.wD_Code || '').toLowerCase().includes(q) ||
        (it.circle_AM || '').toLowerCase().includes(q) ||
        (it.govt_District || '').toLowerCase().includes(q)
      );
    });
  }

  get filteredCount(): number {
    return this.filteredData.length;
  }

  ngOnInit(): void {

    if (!this.CircleAM) {
      this.router.navigate(['/circle-am-login']);
      return;
    }

    const api =
      `https://localhost:7205/api/Home/circleamwisedataget/${encodeURIComponent(this.CircleAM)}`;

    this.http.get<any>(api).subscribe({
      next: (res) => {

        const list = Array.isArray(res)
          ? res
          : res?.data
          ? res.data
          : [res];

        this.circleAMData = list.map((x: any) => ({
          branch: x.branch ?? x.Branch ?? '',
          govt_District: x.govt_District ?? x.Govt_District ?? '',
          circle_AM: x.circle_AM ?? x.Circle_AM ?? '',
          section_AE: x.section_AE ?? x.Section_AE ?? '',
          city: x.city ?? x.City ?? '',
          wD_Code: x.wD_Code ?? x.WD_Code ?? ''
        }));

        console.log('TABLE DATA:', this.circleAMData);

        // 🔥 FORCE UI UPDATE
        this.cdr.detectChanges();
      },
      error: () => {
        this.circleAMData = [];
        this.cdr.detectChanges();
      }
    });
  }
}

interface CircleAMData {
  branch: string;
  govt_District: string;
  circle_AM: string;
  section_AE: string;
  city: string;
  wD_Code: string;
}
