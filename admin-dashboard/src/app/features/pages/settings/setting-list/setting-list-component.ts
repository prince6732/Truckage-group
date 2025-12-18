import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb-component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Eye, Frown, LucideAngularModule, Plus, SquarePen, Trash2, X } from 'lucide-angular';
import { Settings } from '../../../../shared/models/interface';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { SettingsService } from '../../../../core/services/settings.service';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { SettingFormComponent } from "../setting-form/setting-form-component";

@Component({
  selector: 'app-setting-list-component',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BreadcrumbComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    LucideAngularModule,
    SettingFormComponent
  ],
  templateUrl: './setting-list-component.html',
})

export class SettingListComponent {
  settings = signal<Settings[]>([]);
  search = signal<string>('');
  editModal = signal<Settings | null>(null);
  showCompletionModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  settingToDelete = signal<number | null>(null);

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  private flashService = inject(FlashMessageService);
  private settingsService = inject(SettingsService);

  private searchSubject = new Subject<string>();

  readonly Plus = Plus;
  readonly Eye = Eye;
  readonly Edit = SquarePen;
  readonly Trash2 = Trash2;
  readonly Frown = Frown;
  readonly X = X;

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'Settings' }];

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.currentPage.set(1);
      this.getAllSettings();
    });
  }

  ngOnInit(): void {
    this.getAllSettings();
  }

  getAllSettings(): void {
    this.settingsService.getAllSettings(this.currentPage(), this.pageSize(), this.search()).subscribe({
      next: (response) => {
        this.settings.set(response.data);
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
    this.getAllSettings();
  }

  openModal(): void {
    this.editModal.set(null);
    this.showCompletionModal.set(true);
  }

  closeModal(e: boolean): void {
    this.showCompletionModal.set(false);
    if (e) {
      this.getAllSettings();
    }
  }

  openEditModal(event: Event, setting: Settings): void {
    event.stopPropagation();
    this.editModal.set(setting);
    this.showCompletionModal.set(true);
  }

  confirmDelete(event: Event, setting_key: string): void {
    event.stopPropagation();
    this.settingToDelete.set(setting_key as unknown as number);
    this.showDeleteModal.set(true);
  }

  deleteSetting(): void {
    const id = this.settingToDelete();
    if (id) {
      this.settingsService.deleteSetting(id.toString()).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.settingToDelete.set(null);
          this.getAllSettings();
          this.flashService.show('Setting deleted successfully.', "success");
        },
        error: (err) => {
          console.error('Error deleting setting:', err);
          this.showDeleteModal.set(false);
          this.settingToDelete.set(null);
          this.flashService.show('Failed to delete setting.', "error");
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.settingToDelete.set(null);
  }
}
