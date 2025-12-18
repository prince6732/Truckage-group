import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb-component',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './breadcrumb-component.html',
})
export class BreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
  readonly ChevronRight = ChevronRight;
}
