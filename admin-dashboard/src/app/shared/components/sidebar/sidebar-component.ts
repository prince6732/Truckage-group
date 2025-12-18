import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LayoutDashboard,
  MapPin,
  CreditCard,
  Settings,
  LucideAngularModule,
  House,
  Layers,
  ChevronDown,
  ChevronRight,
} from 'lucide-angular';

interface MenuItem {
  label: string;
  icon?: any;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, CommonModule, LucideAngularModule],
  templateUrl: './sidebar-component.html',
  standalone: true,
})
export class SidebarComponent {
  isOpen = input<boolean>(true);
  closeSidebar = output<void>();
  openItems: Record<string, boolean> = {};

  private router = inject(Router);

  activeRoute: string = '';

  readonly House = House;
  readonly LayoutDashboard = LayoutDashboard;
  readonly MapPin = MapPin;
  readonly CreditCard = CreditCard;
  readonly Settings = Settings;
  readonly Layers = Layers;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;

  constructor() {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/' },
    { icon: MapPin, label: 'Locations', route: '/locations' },
    { icon: CreditCard, label: 'Subscription Types', route: '/subscription-types' },
    {
      label: "Promotional Application",
      icon: Layers,
      children: [
        { icon: MapPin, label: "Hero Section", route: "/hero-section" },
        { label: "Our Services", route: "/our-services" },
        { label: "Templates Management", route: "/templates-management" },
      ],
    },
    { icon: Settings, label: 'Settings', route: '/settings' }
  ];

  onItemClick() {
    if (window.innerWidth < 1024) {
      this.closeSidebar.emit();
    }
  }

  toggleMenu(label: string) {
    this.openItems[label] = !this.openItems[label];
  }

  isParentActive(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => this.activeRoute.startsWith(child.route!));
  }

}
