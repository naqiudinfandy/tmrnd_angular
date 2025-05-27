import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common'; // Import NgFor
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // For ngModel in date inputs
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { DatePipe } from '@angular/common'; // For date formatting

interface AlertData {
  status: string;
  datetime: string;
  remark: string;
  duration: string;
}

interface AlertApiResponse {
  data: AlertData[];
  total: number;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, NgFor], 
  providers: [DatePipe], 
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  productId: string | null = null;
  alerts: AlertData[] = [];
  loading = false;
  error = '';

  startDate: string; 
  endDate: string;   

  pageSize = 5;
  currentPage = 1;
  totalAlerts = 0;
  totalPages = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    this.startDate = this.formatDate(yesterday);
    this.endDate = this.formatDate(today);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadAlerts();
      } else {
        this.error = 'Product ID not found in route.';
      }
    });
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  loadAlerts(): void {
    if (!this.productId) {
      this.error = 'Product ID is missing.';
      return;
    }

    this.loading = true;
    this.error = '';

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.error = 'No authentication token found. Please log in.';
      this.loading = false;
      this.router.navigate(['']); 
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    const indexNumber = this.currentPage - 1;

    let params = new HttpParams()
      .set('indexNumber', indexNumber.toString())
      .set('pageSize', this.pageSize.toString())
      .set('startDate', this.startDate)
      .set('endDate', this.endDate);

    this.http.get<AlertApiResponse>(`https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list/${this.productId}`, { headers, params })
      .subscribe({
        next: (response) => {
          this.alerts = response.data;
          this.totalAlerts = response.total;
          this.totalPages = Math.ceil(this.totalAlerts / this.pageSize);

          if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
  
            this.loadAlerts();
          } else if (this.totalPages === 0) {
              this.currentPage = 1; 
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading alerts:', err);
          this.error = 'Failed to load alert data. ' + (err.error?.message || err.message);
          this.loading = false;
          if (err.status === 401) {
            localStorage.removeItem('authToken');
            this.router.navigate(['']);
          }
        }
      });
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAlerts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAlerts();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAlerts();
    }
  }


  onDateChange(): void {

    this.currentPage = 1;
    this.loadAlerts();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}