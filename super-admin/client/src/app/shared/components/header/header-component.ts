import { Component, input, output, signal, HostListener, inject } from '@angular/core';
import { Menu, Search, ChevronDown, LucideAngularModule, User, Settings, LogOut } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-header-component',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './header-component.html',
  standalone: true,
})
export class HeaderComponent {
  isSidebarOpen = input<boolean>(true);
  toggleSidebar = output<void>();
  isProfileMenuOpen = signal(false);

  readonly Menu = Menu;
  readonly Search = Search;
  readonly ChevronDown = ChevronDown;
  readonly User = User;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  private tokenStorageService = inject(TokenStorageService);

  user = this.tokenStorageService.user;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.isProfileMenuOpen.set(false);
    }
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen.update(value => !value);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    location.reload();
  }

  get initials() {
    if (!this.user()) return 'U';
    const name = this.user()?.name ?? 'User';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

}
