import { Component, inject, signal } from '@angular/core';
import { HeroSection } from '../../../../shared/models/interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroSectionFormComponent } from '../hero-section-form/hero-section-form-component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb-component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CreditCard, Info, LucideAngularModule, Plus, SquarePen, Trash2, X } from 'lucide-angular';
import { Subject } from 'rxjs/internal/Subject';
import { HeroSectionService } from '../../../../core/services/hero-section.service';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { environment } from '../../../../../environments/environment';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { HeroSectionDetail } from "../hero-section-detail/hero-section-detail";

@Component({
  selector: 'app-hero-section-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeroSectionFormComponent,
    BreadcrumbComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule,
    HeroSectionDetail,
    ModalComponent
  ],
  templateUrl: './hero-section-list-component.html',
})
export class HeroSectionListComponent {
  heroSections = signal<HeroSection[]>([]);
  editModal = signal<HeroSection | null>(null);
  showCompletionModal = signal<boolean>(false);
  search = signal<string>('');

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'Hero Sections' }];

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  showDeleteModal = signal<boolean>(false);
  heroSectionToDelete = signal<number | null>(null);

  private searchSubject = new Subject<string>();

  imageUrl = environment.imageUrl;

  isDetailsModalOpen = signal<boolean>(false);
  selectedItem = signal<HeroSection | null>(null);


  readonly Plus = Plus;
  readonly Edit = SquarePen;
  readonly Info = Info;
  readonly Trash2 = Trash2;
  readonly CreditCard = CreditCard;
  readonly X = X;

  private heroSectionService = inject(HeroSectionService);
  private flashService = inject(FlashMessageService);

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.currentPage.set(1);
      this.getAllHeroSections();
    });
  }

  ngOnInit(): void {
    this.getAllHeroSections();
  }

  getAllHeroSections(): void {
    this.heroSectionService.getAllHeroSections(
      this.currentPage(),
      this.pageSize(),
      this.search()
    ).subscribe({
      next: (response) => {
        this.heroSections.set(response.data);
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
    this.getAllHeroSections();
  }

  openModal(): void {
    this.editModal.set(null);
    this.showCompletionModal.set(true);
  }

  closeModal(e: boolean): void {
    this.showCompletionModal.set(false);
    if (e) {
      this.getAllHeroSections();
    }
  }

  openEditModal(event: Event, heroSection: HeroSection): void {
    event.stopPropagation();
    this.editModal.set(heroSection);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, id: number): void {
    event.stopPropagation();
    this.heroSectionToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  deleteHeroSection(): void {
    const id = this.heroSectionToDelete();
    if (id) {
      this.heroSectionService.deleteHeroSection(id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.getAllHeroSections();
          this.flashService.show('Hero section deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting hero section:', err);
          this.showDeleteModal.set(false);
          this.flashService.show('Failed to delete hero section.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.heroSectionToDelete.set(null);
  }

  openDetailsModal(event: Event, item: HeroSection): void {
    event.stopPropagation();
    this.selectedItem.set(item);
    this.isDetailsModalOpen.set(true);
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen.set(false);
    this.selectedItem.set(null);
  }

}
