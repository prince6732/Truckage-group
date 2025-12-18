import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-component',
  standalone: true,
  imports: [],
  templateUrl: './not-found-component.html',
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  goBackLink() {
    this.router.navigate([this.location.back()]);
  }
}
