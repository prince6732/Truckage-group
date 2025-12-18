import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { State } from '../../../../../shared/models/interface';
import { StateService } from '../../../../../core/services/state.service';
import { BreadcrumbComponent } from "../../../../../shared/components/breadcrumb/breadcrumb-component";
import { StateFormComponent } from "../state-form/state-form-component";
import { ConfirmationModalComponent } from '../../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { debounceTime, Subject } from 'rxjs';
import { LucideAngularModule, Plus, Eye, Trash2, Frown, X, SquarePen } from 'lucide-angular';
import { FlashMessageService } from '../../../../../core/services/flash-message.service';

@Component({
  selector: 'app-state-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BreadcrumbComponent,
    StateFormComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule
  ],
  templateUrl: './state-list-component.html',
  standalone: true,
})

export class StateListComponent implements OnInit {
  states = signal<State[]>([]);
  search = signal<string>('');
  editModal = signal<State | null>(null);
  showCompletionModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  stateToDelete = signal<number | null>(null);

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  private flashService = inject(FlashMessageService);
  private stateService = inject(StateService);
  private router = inject(Router);

  private searchSubject = new Subject<string>();

  readonly Plus = Plus;
  readonly Eye = Eye;
  readonly Edit = SquarePen;
  readonly Trash2 = Trash2;
  readonly Frown = Frown;
  readonly X = X;

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'States' }];

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.currentPage.set(1);
      this.getAllStates();
    });
  }

  ngOnInit(): void {
    this.getAllStates();
  }

  getAllStates(): void {
    this.stateService.getAllStates(this.currentPage(), this.pageSize(), this.search()).subscribe({
      next: (response) => {
        this.states.set(response.data);
        this.totalItems.set(response.pagination.total);
        this.totalPages.set(response.pagination.totalPages);
      },
      error: (e) => console.error(e),
    });
  }

  onSearchChange(searchTerm: string): void {
    this.search.set(searchTerm);
    this.searchSubject.next(searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.getAllStates();
  }

  viewStateCities(event: Event, state_id: number) {
    event.stopPropagation();
    this.router.navigate(['/locations', state_id, 'cities']);
  }

  openModal(): void {
    this.editModal.set(null);
    this.showCompletionModal.set(true);
  }

  closeModal(e: boolean): void {
    this.showCompletionModal.set(false);
    if (e) {
      this.getAllStates();
    }
  }

  openEditModal(event: Event, state: State): void {
    event.stopPropagation();
    this.editModal.set(state);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, state_id: number): void {
    event.stopPropagation();
    this.stateToDelete.set(state_id);
    this.showDeleteModal.set(true);
  }

  deleteState(): void {
    const id = this.stateToDelete();
    if (id) {
      this.stateService.deleteState(id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.stateToDelete.set(null);
          this.getAllStates();
          this.flashService.show('State deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting state:', err);
          this.showDeleteModal.set(false);
          this.stateToDelete.set(null);
          this.flashService.show('Failed to delete state.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.stateToDelete.set(null);
  }
}
