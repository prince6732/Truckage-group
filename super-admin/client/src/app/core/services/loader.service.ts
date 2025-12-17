import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private activeRequests = signal(0);

  isLoading = computed(() => this.activeRequests() > 0);

  increment() {
    this.activeRequests.update(n => n + 1);
  }

  decrement() {
    this.activeRequests.update(n => Math.max(n - 1, 0));
  }
}
