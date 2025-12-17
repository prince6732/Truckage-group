import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OurServicesFormComponent } from '../our-services-form/our-services-form-component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb-component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { OurServicesDetailsComponent } from '../our-services-details/our-services-details-component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { CreditCard, Info, LucideAngularModule, Plus, SquarePen, Trash2, X } from 'lucide-angular';
import { OurServices } from '../../../../shared/models/interface';
import { debounceTime, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { OurServicesService } from '../../../../core/services/our-services.service';
import { FlashMessageService } from '../../../../core/services/flash-message.service';

@Component({
  selector: 'app-our-services-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OurServicesFormComponent,
    BreadcrumbComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule,
    OurServicesDetailsComponent,
    ModalComponent
  ],
  templateUrl: './our-services-list-component.html',
})

export class OurServicesListComponent {
  ourServices = signal<OurServices[]>([]);
  editModal = signal<OurServices | null>(null);
  showCompletionModal = signal<boolean>(false);
  search = signal<string>('');

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'Our Services' }];

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  showDeleteModal = signal<boolean>(false);
  ourServicesToDelete = signal<number | null>(null);

  private searchSubject = new Subject<string>();

  imageUrl = environment.imageUrl;

  isDetailsModalOpen = signal<boolean>(false);
  selectedItem = signal<OurServices | null>(null);

  readonly Plus = Plus;
  readonly Edit = SquarePen;
  readonly Info = Info;
  readonly Trash2 = Trash2;
  readonly CreditCard = CreditCard;
  readonly X = X;

  private ourServicesService = inject(OurServicesService);
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
    this.ourServicesService.getAllOurServices(
      this.currentPage(),
      this.pageSize(),
      this.search()
    ).subscribe({
      next: (response) => {
        this.ourServices.set(response.data);
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

  openEditModal(event: Event, ourService: OurServices): void {
    event.stopPropagation();
    this.editModal.set(ourService);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, id: number): void {
    event.stopPropagation();
    this.ourServicesToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  deleteOurService(): void {
    const id = this.ourServicesToDelete();
    if (id) {
      this.ourServicesService.deleteOurService(id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.getAllServices();
          this.flashService.show('Our service deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting our service:', err);
          this.showDeleteModal.set(false);
          this.flashService.show('Failed to delete our service.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.ourServicesToDelete.set(null);
  }

  openDetailsModal(event: Event, item: OurServices): void {
    event.stopPropagation();
    this.selectedItem.set(item);
    this.isDetailsModalOpen.set(true);
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen.set(false);
    this.selectedItem.set(null);
  }

}
