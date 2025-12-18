import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SubscriptionTypes } from '../../../../shared/models/interface';
import { SubscriptionTypesService } from '../../../../core/services/subscription-types.service';
import { SubscriptionTypeFormComponent } from "../subscription-type-form/subscription-type-form-component";
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb-component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LucideAngularModule, Plus, Trash2, CreditCard, X, SquarePen } from 'lucide-angular';
import { FlashMessageService } from '../../../../core/services/flash-message.service';

@Component({
  selector: 'app-subscription-type-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SubscriptionTypeFormComponent,
    BreadcrumbComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule
  ],
  templateUrl: './subscription-type-list-component.html',
  standalone: true,
})

export class SubscriptionTypeListComponent implements OnInit {
  subscriptionTypes = signal<SubscriptionTypes[]>([]);
  editModal = signal<SubscriptionTypes | null>(null);
  showCompletionModal = signal<boolean>(false);
  search = signal<string>('');

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'Subscription Types' }];

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  showDeleteModal = signal<boolean>(false);
  subscriptionTypeToDelete = signal<number | null>(null);

  private searchSubject = new Subject<string>();

  readonly Plus = Plus;
  readonly Edit = SquarePen;
  readonly Trash2 = Trash2;
  readonly CreditCard = CreditCard;
  readonly X = X;

  private subscriptionTypesService = inject(SubscriptionTypesService);
  private flashService = inject(FlashMessageService);

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.currentPage.set(1);
      this.getAllSubscriptionTypes();
    });
  }

  ngOnInit(): void {
    this.getAllSubscriptionTypes();
  }

  getAllSubscriptionTypes(): void {
    this.subscriptionTypesService.getAllSubscriptionTypes(
      this.currentPage(),
      this.pageSize(),
      this.search()
    ).subscribe({
      next: (response) => {
        this.subscriptionTypes.set(response.data);
        this.totalItems.set(response.pagination.total);
        this.totalPages.set(response.pagination.totalPages);
      },
      error: (e) => console.error(e),
    });
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.searchSubject.next(value);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.getAllSubscriptionTypes();
  }

  openModal(): void {
    this.editModal.set(null);
    this.showCompletionModal.set(true);
  }

  closeModal(e: boolean): void {
    this.showCompletionModal.set(false);
    if (e) {
      this.getAllSubscriptionTypes();
    }
  }

  openEditModal(event: Event, subscriptionTypes: SubscriptionTypes): void {
    event.stopPropagation();
    this.editModal.set(subscriptionTypes);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, id: number): void {
    event.stopPropagation();
    this.subscriptionTypeToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  deleteSubscriptionType(): void {
    const id = this.subscriptionTypeToDelete();
    if (id) {
      this.subscriptionTypesService.deleteSubscriptionType(id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.getAllSubscriptionTypes();
          this.flashService.show('Subscription type deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting subscription type:', err);
          this.showDeleteModal.set(false);
          this.flashService.show('Failed to delete subscription type.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.subscriptionTypeToDelete.set(null);
  }
}
