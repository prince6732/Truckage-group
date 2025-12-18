import { Component, OnInit, signal, inject } from '@angular/core';
import { City } from '../../../../../shared/models/interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CitiesFormComponent } from '../cities-form/cities-form-component';
import { HighlightPipe } from '../../../../../shared/pipes/highlight.pipe';
import { StateCitiesService } from '../../../../../core/services/state-cities.service';
import { BreadcrumbComponent } from "../../../../../shared/components/breadcrumb/breadcrumb-component";
import { ConfirmationModalComponent } from '../../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LucideAngularModule, Plus, Trash2, Frown, X, SquarePen } from 'lucide-angular';
import { FlashMessageService } from '../../../../../core/services/flash-message.service';

@Component({
  selector: 'app-cities-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CitiesFormComponent,
    HighlightPipe,
    BreadcrumbComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule
  ],
  templateUrl: './cities-list-component.html',
  standalone: true,
})
export class CitiesListComponent implements OnInit {
  cities = signal<City[]>([]);
  state_id!: number;
  stateName = signal<string>('');
  search = signal<string>('');
  editModal = signal<City | null>(null);
  showCompletionModal = signal<boolean>(false);

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  showDeleteModal = signal<boolean>(false);
  cityToDelete = signal<number | null>(null);

  private searchSubject = new Subject<string>();

  private flashService = inject(FlashMessageService);
  private route = inject(ActivatedRoute);
  private cityService = inject(StateCitiesService);

  readonly Plus = Plus;
  readonly Edit = SquarePen;
  readonly Trash2 = Trash2;
  readonly Frown = Frown;
  readonly X = X;

  breadcrumbItems = [
    { label: 'Dashboard', link: '/' },
    { label: 'States', link: '/locations' },
    { label: '' },
  ];

  constructor() {
    this.state_id = Number(this.route.snapshot.paramMap.get('state_id'));

    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.currentPage.set(1);
      this.getCitiesByState();
    });
  }

  ngOnInit(): void {
    this.getCitiesByState();
  }

  getCitiesByState(): void {
    this.cityService.getAllCitiesByState(
      this.state_id,
      this.currentPage(),
      this.pageSize(),
      this.search()
    ).subscribe({
      next: (data: any) => {
        this.cities.set(data.cities);
        this.stateName.set(data?.stateName);
        this.totalItems.set(data.pagination.total);
        this.totalPages.set(data.pagination.totalPages);
        this.setBreadcrumb();
      },
      error: (e) => console.error(e),
    });
  }

  setBreadcrumb(): void {
    this.breadcrumbItems[2].label = `Cities - ${this.stateName()}`;
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.searchSubject.next(value);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.getCitiesByState();
  }

  openModal(): void {
    this.editModal.set(null);
    this.showCompletionModal.set(true);
  }

  closeModal(e: boolean): void {
    this.showCompletionModal.set(false);
    if (e) {
      this.getCitiesByState();
    }
  }

  openEditModal(event: Event, city: City): void {
    event.stopPropagation();
    this.editModal.set(city);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, city_id: number): void {
    event.stopPropagation();
    this.cityToDelete.set(city_id);
    this.showDeleteModal.set(true);
  }

  deleteCity(): void {
    const city_id = this.cityToDelete();
    if (city_id) {
      this.cityService.deleteCity(city_id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.getCitiesByState();
          this.flashService.show('City deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting city:', err);
          this.showDeleteModal.set(false);
          this.flashService.show('Failed to delete city.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.cityToDelete.set(null);
  }
}
