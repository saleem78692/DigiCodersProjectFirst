import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './all-users.html',
  styleUrls: ['./all-users.css'],
})
export class AllUsers implements OnInit {
  activeSection: string = 'users';
  allUsers: AllUser[] = [];
  filteredUsers: AllUser[] = [];
  searchText: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  itemsPerPage: number = 10;
  currentPage: number = 1;

  http = inject(HttpClient);

  ngOnInit(): void {
    this.loadAllUsers();
  }

  setActive(section: string): void {
    this.activeSection = section;
  }

  loadAllUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const api = 'https://localhost:7205/api/Home/ShowData';

    // Accept any response shape and try to normalize it to an array of items
    this.http.get<any>(api).subscribe({
      next: (res) => {
        console.log('API raw response:', res);

        let items: any[] = [];

        // common array at root
        if (Array.isArray(res)) {
          items = res;
        }

        // common nested properties used by many APIs
        if ((!items || items.length === 0) && res) {
          if (Array.isArray(res.data)) items = res.data;
          else if (Array.isArray(res.result)) items = res.result;
          else if (Array.isArray(res.items)) items = res.items;
          else if (Array.isArray(res.value)) items = res.value;
          else if (Array.isArray(res.Value)) items = res.Value;
          else if (Array.isArray(res.d)) items = res.d;
          else if (Array.isArray(res.Data)) items = res.Data;
        }

        // sometimes response is a JSON string
        if ((!items || items.length === 0) && typeof res === 'string') {
          try {
            const parsed = JSON.parse(res);
            if (Array.isArray(parsed)) items = parsed;
            else if (Array.isArray(parsed.data)) items = parsed.data;
          } catch (e) {
            // ignore parse error
            console.warn('Failed to parse string response as JSON', e);
          }
        }

        // If still nothing, bail with helpful message
        if (!items || !Array.isArray(items) || items.length === 0) {
          this.isLoading = false;
          this.errorMessage = 'Invalid data format received from server. Expected an array of users.';
          console.error('Invalid data format - could not extract array from response:', res);
          return;
        }

        // Normalize fields to the AllUser interface (handles varied property names)
        this.allUsers = items.map((it: any) => ({
          id: it.id ?? it.ID ?? it.Id ?? 0,
          branch: it.branch ?? it.Branch ?? it.branchName ?? it.BranchName ?? '',
          govt_District: it.govt_District ?? it.govtDistrict ?? it.Govt_District ?? it.GovtDistrict ?? it.governmentDistrict ?? '',
          circle_AM: it.circle_AM ?? it.circleAM ?? it.Circle_AM ?? it.CircleAM ?? it.circle ?? '',
          section_AE: it.section_AE ?? it.sectionAE ?? it.Section_AE ?? it.SectionAE ?? it.section ?? '',
          city: it.city ?? it.City ?? it.town ?? '',
          wD_Code: it.wD_Code ?? it.wdCode ?? it.WD_Code ?? it.wDCode ?? it.code ?? ''
        } as AllUser));

        this.filteredUsers = [...this.allUsers];
        this.isLoading = false;
        console.log('Normalized users count:', this.allUsers.length);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = `Error: ${err.status || 'Network'} - ${err.statusText || 'Failed to load users'}`;
        console.error('HTTP error loading users:', err);
      }
    });
  }

  searchUsers(): void {
    if (!this.searchText.trim()) {
      this.filteredUsers = [...this.allUsers];
      this.currentPage = 1;
      return;
    }

    const search = this.searchText.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user =>
      user.id?.toString().includes(search) ||
      user.branch?.toLowerCase().includes(search) ||
      user.govt_District?.toLowerCase().includes(search) ||
      user.circle_AM?.toLowerCase().includes(search) ||
      user.section_AE?.toLowerCase().includes(search) ||
      user.city?.toLowerCase().includes(search) ||
      user.wD_Code?.toLowerCase().includes(search)
    );
    this.currentPage = 1;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      let aValue = (a as any)[column] ?? '';
      let bValue = (b as any)[column] ?? '';

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  get paginatedUsers(): AllUser[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackByUserId(index: number, user: AllUser): any {
    return user.id;
  }

  exportToCSV(): void {
    if (this.filteredUsers.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['ID', 'Branch', 'Govt District', 'Circle AM', 'Section AE', 'City', 'WD Code'];
    const rows = this.filteredUsers.map(user => [
      user.id,
      user.branch,
      user.govt_District,
      user.circle_AM,
      user.section_AE,
      user.city,
      user.wD_Code
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

 viewDetails(user:any): void {
    //alert(`User Details:\nID: ${user.id}\nBranch: ${user.branch}\nGovt District: ${user.govt_District}\nCircle AM: ${user.circle_AM}\nSection AE: ${user.section_AE}\nCity: ${user.city}\nWD Code: ${user.wD_Code}`);
    const modalTitle = document.querySelector('#exampleModal .modal-title') as HTMLElement;
    const modalBody = document.querySelector('#exampleModal .modal-body') as HTMLElement;
    if (modalTitle && modalBody) {
      modalTitle.textContent = `User Details - ID: ${user.id}`;
      modalBody.innerHTML = `
        <p><strong>Branch:</strong> ${user.branch}</p>
        <p><strong>Govt District:</strong> ${user.govt_District}</p>
        <p><strong>Circle AM:</strong> ${user.circle_AM}</p>
        <p><strong>Section AE:</strong> ${user.section_AE}</p>
        <p><strong>City:</strong> ${user.city}</p>
        <p><strong>WD Code:</strong> ${user.wD_Code}</p>
      `;
    }
  }
  selectedUser: any = {};

  editUser(user: any) {
    console.log('editUser() called with user:', user);
    this.selectedUser = { ...user }; // Create a copy to avoid modifying the original
    console.log('selectedUser set to:', this.selectedUser);
  }
updateUser() {
  console.log('updateUser() called with selectedUser:', this.selectedUser);
  
  // Validation
  if (!this.selectedUser || !this.selectedUser.id) {
    alert('User ID is missing. Please close and try again.');
    console.error('Invalid selectedUser:', this.selectedUser);
    return;
  }
  
  // Create FormData for form-encoded request (backend expects this)
  const formData = new FormData();
  formData.append('id', this.selectedUser.id.toString());
  formData.append('branch', this.selectedUser.branch || '');
  formData.append('circle_AM', this.selectedUser.circle_AM || '');
  
  const api = `https://localhost:7205/api/Home/EditData`;
  console.log('API URL:', api);
  console.log('Sending data:', {
    id: this.selectedUser.id,
    branch: this.selectedUser.branch,
    circle_AM: this.selectedUser.circle_AM
  });
  
  // Use PATCH method (not PUT) with FormData
  this.http.patch<any>(api, formData).subscribe({
    next: (res) => {
      console.log('User updated successfully - Response:', res);
      
      // Update the user in the allUsers array
      const userIndex = this.allUsers.findIndex(u => u.id === this.selectedUser.id);
      console.log('User index:', userIndex);
      
      if (userIndex !== -1) {
        // Create a new user object with the updated data
        const updatedUser: AllUser = {
          id: this.selectedUser.id,
          branch: this.selectedUser.branch || '',
          govt_District: this.selectedUser.govt_District || '',
          circle_AM: this.selectedUser.circle_AM || '',
          section_AE: this.selectedUser.section_AE || '',
          city: this.selectedUser.city || '',
          wD_Code: this.selectedUser.wD_Code || ''
        };
        
        this.allUsers[userIndex] = updatedUser;
        this.filteredUsers = [...this.allUsers];
        console.log('Updated allUsers and filteredUsers');
      } else {
        console.warn('User not found in allUsers array');
      }
      
      // Close modal
      const modal = document.getElementById('exampleModal12') as any;
      if (modal) {
        try {
          const bsModal = (window as any).bootstrap?.Modal?.getInstance(modal);
          if (bsModal) {
            bsModal.hide();
          } else {
            modal.style.display = 'none';
            modal.classList.remove('show');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
          }
        } catch (e) {
          console.error('Error closing modal:', e);
        }
      }
      
      alert('✅ User updated successfully!');
      this.selectedUser = {};
    },
    error: (err) => {
      console.error('Error updating user - Full error:', err);
      console.error('Status:', err.status);
      console.error('Message:', err.message);
      console.error('Response:', err.error);
      
      let errorMsg = 'Failed to update user. Please try again.';
      if (err.error?.message) {
        errorMsg = err.error.message;
      } else if (err.statusText) {
        errorMsg = `${err.status}: ${err.statusText}`;
      }
      
      alert(`❌ ${errorMsg}`);
    }
  });
}
 
}
interface AllUser{
   id: number;
  branch: string;
  govt_District: string;
  circle_AM: string;
  section_AE: string;
  city: string;
  wD_Code: string;
}