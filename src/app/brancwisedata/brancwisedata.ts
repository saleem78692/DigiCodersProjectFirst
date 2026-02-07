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
  selector: 'app-brancwisedata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brancwisedata.html',
  styleUrls: ['./brancwisedata.css'],
})
export class Brancwisedata implements OnInit {

  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  branchData: BranchData[] = [];
  branch: string = localStorage.getItem('branch') || '';
  loading = true;
  error = '';

  ngOnInit(): void {
    if (!this.branch) {
      this.router.navigate(['/branchlogin']);
      return;
    }

    const encoded = encodeURIComponent(this.branch);
    const api = `https://localhost:7205/api/Home/branchwisedataget/${encoded}`;

    console.log('API:', api);

    this.http.get<any>(api).subscribe({
      next: (res) => {
        console.log('Raw response:', res);

        let data: BranchData[] = [];

        if (Array.isArray(res)) {
          data = res;
        } else if (res?.data && Array.isArray(res.data)) {
          data = res.data;
        } else if (res && typeof res === 'object') {
          data = [res];
        }

        // 🔥 IMPORTANT: new reference
        this.branchData = [...data];

        this.loading = false;

        // 🔥 Force UI refresh
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load branch data';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}

interface BranchData {
  branch: string;
  govt_District: string;
  circle_AM: string;
  section_AE: string;
  city: string;
  wD_Code: string;
}
