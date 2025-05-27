import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

interface Product {
  id: string;
  productName: string;
  url: string;
  address?: string;
}

interface NewProduct {
  productName: string;
  url: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';

  showModal = false;
  isEditMode = false;
  editingProductId: string | null = null;
  newProduct: NewProduct = {
    productName: '',
    url: ''
  };

  tableRows = 6;
  itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = '';

    const token = localStorage.getItem('authToken');

    if (!token) {
      this.error = 'No authentication token found';
      this.loading = false;
      this.router.navigate(['']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<Product[]>('https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList', { headers })
      .subscribe({
        next: (data) => {
          this.products = data.map(product => ({
            ...product,
            url: product.url || product.address || ''
          }));
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
          if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
          } else if (this.totalPages === 0) {
            this.currentPage = 1;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.error = 'Failed to load products';
          this.loading = false;

          if (err.status === 401) {
            localStorage.removeItem('authToken');
            this.router.navigate(['']);
          }
        }
      });
  }

  get currentPageProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get tableData(): (Product | null)[] {
    const pageProducts = this.currentPageProducts;
    const data: (Product | null)[] = [];

    for (let i = 0; i < this.tableRows; i++) {
      data.push(pageProducts[i] || null);
    }

    return data;
  }

  get isFormValid(): boolean {
    return this.newProduct.productName.trim() !== '' &&
           this.newProduct.url.trim() !== '' &&
           this.isValidUrl(this.newProduct.url.trim());
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addProduct() {
    console.log('Add Product clicked');
    this.isEditMode = false;
    this.editingProductId = null;
    this.showModal = true;
    this.newProduct = {
      productName: '',
      url: ''
    };
  }

  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.editingProductId = null;
    this.newProduct = {
      productName: '',
      url: ''
    };
  }

  submitProduct() {
    if (!this.isFormValid) {
      return;
    }

    if (this.isEditMode && this.editingProductId) {
      this.updateProduct();
    } else {
      this.addNewProduct();
    }
  }

  addNewProduct() {
    const newId = 'product_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    const product: Product = {
      id: newId,
      productName: this.newProduct.productName.trim(),
      url: this.newProduct.url.trim(),
      address: ''
    };

    this.products.push(product);

    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.currentPage = this.totalPages;

    this.closeModal();

    console.log('New product added:', product);
    console.log('Total products:', this.products.length);
  }

  updateProduct() {
    if (!this.editingProductId) return;

    const productIndex = this.products.findIndex(p => p.id === this.editingProductId);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        productName: this.newProduct.productName.trim(),
        url: this.newProduct.url.trim(),
        address: ''
      };

      console.log('Product updated:', this.products[productIndex]);
    }

    this.closeModal();
  }

  removeProduct() {
    if (!this.editingProductId) return;

    this.products = this.products.filter(p => p.id !== this.editingProductId);
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 1;
    }

    console.log('Product removed. Total products:', this.products.length);
    this.closeModal();
  }

  editProduct(product: Product) {
    console.log('Edit product:', product);
    this.isEditMode = true;
    this.editingProductId = product.id;
    this.showModal = true;

    this.newProduct = {
      productName: product.productName,
      url: product.url || ''
    };
  }

  onModalBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
