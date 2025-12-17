import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplatesFormComponent } from '../templates-form/templates-form-component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb-component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CreditCard, Info, LucideAngularModule, Plus, SquarePen, Trash2, X } from 'lucide-angular';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TemplatesDetailsComponent } from '../templates-details/templates-details-component';
import { Templates } from '../../../../shared/models/interface';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from '../../../../../environments/environment';
import { TemplatesService } from '../../../../core/services/templates.service';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-templates-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TemplatesFormComponent,
    BreadcrumbComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule,
    TemplatesDetailsComponent,
    ModalComponent
  ],
  templateUrl: './templates-list-component.html',
})

export class TemplatesListComponent {
  templates = signal<Templates[]>([]);
  editModal = signal<Templates | null>(null);
  showCompletionModal = signal<boolean>(false);
  search = signal<string>('');

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'Templates Management' }];

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  showDeleteModal = signal<boolean>(false);
  templatesToDelete = signal<number | null>(null);

  private searchSubject = new Subject<string>();

  imageUrl = environment.imageUrl;

  isDetailsModalOpen = signal<boolean>(false);
  selectedItem = signal<Templates | null>(null);

  readonly Plus = Plus;
  readonly Edit = SquarePen;
  readonly Info = Info;
  readonly Trash2 = Trash2;
  readonly CreditCard = CreditCard;
  readonly X = X;

  private templatesService = inject(TemplatesService);
  private flashService = inject(FlashMessageService);

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.currentPage.set(1);
      this.getAllServices();
    });
  }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(): void {
    this.templatesService.getAllTemplates(
      this.currentPage(),
      this.pageSize(),
      this.search()
    ).subscribe({
      next: (response) => {
        this.templates.set(response.data);
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
    this.getAllServices();
  }

  openModal(): void {
    this.editModal.set(null);
    this.showCompletionModal.set(true);
  }

  closeModal(e: boolean): void {
    this.showCompletionModal.set(false);
    if (e) {
      this.getAllServices();
    }
  }

  openEditModal(event: Event, template: Templates): void {
    event.stopPropagation();
    this.editModal.set(template);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, id: number): void {
    event.stopPropagation();
    this.templatesToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  deleteTemplate(): void {
    const id = this.templatesToDelete();
    if (id) {
      this.templatesService.deleteTemplate(id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.getAllServices();
          this.flashService.show('Template deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting template:', err);
          this.showDeleteModal.set(false);
          this.flashService.show('Failed to delete template.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.templatesToDelete.set(null);
  }

  openDetailsModal(event: Event, item: Templates): void {
    event.stopPropagation();
    this.selectedItem.set(item);
    this.isDetailsModalOpen.set(true);
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen.set(false);
    this.selectedItem.set(null);
  }

}
