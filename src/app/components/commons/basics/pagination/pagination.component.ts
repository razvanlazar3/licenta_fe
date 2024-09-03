import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() lastPage: number = 0;
  @Output() redirectToPageEvent = new EventEmitter<number>();

  currentPage: number = 1;
  visiblePages = [1, 2, 3];

  ngOnChanges(): void {
    this.currentPage = 1;
    this.calculateVisiblePages();
  }

  redirectToPage(page: number) {
    this.currentPage = page;
    this.redirectToPageEvent.emit(this.currentPage);
    this.calculateVisiblePages();
  }

  nextPage() {
    this.currentPage++;
    this.redirectToPageEvent.emit(this.currentPage);
    this.calculateVisiblePages();
  }

  previousPage() {
    this.currentPage--;
    this.redirectToPageEvent.emit(this.currentPage);
    this.calculateVisiblePages();
  }

  redirectToLastPage() {
    this.currentPage = this.lastPage;
    this.redirectToPageEvent.emit(this.currentPage);
    this.calculateVisiblePages();
  }

  private calculateVisiblePages() {
    if (this.lastPage <= 3) {
      this.visiblePages = Array.from({length: this.lastPage}, (_, i) => this.currentPage + i);
    } else {
      if (this.currentPage === 1) {
        this.visiblePages = Array.from({length: 3}, (_, i) => this.currentPage + i);
      } else {
        if (this.currentPage === this.lastPage) {
          this.visiblePages = Array.from({length: 3}, (_, i) => this.currentPage - i).reverse();
        } else {
          this.visiblePages = Array.from({length: 3}, (_, i) => this.currentPage - 1 + i);
        }
      }
    }
  }
}
