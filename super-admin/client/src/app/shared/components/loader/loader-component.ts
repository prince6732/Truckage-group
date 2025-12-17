import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader-component',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (loader.isLoading()) {
    <div class="loader-overlay">
      <div class="loader"></div>
    </div>
  }
  `,
  styles: [
    `
      .loader-overlay {
        position: fixed;
        inset: 0;
        backdrop-filter: blur(4px);
        background: rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.15s ease-out;
      }

      .loader {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 6px solid transparent;
        border-top-color: #3b82f6;
        border-bottom-color: #3b82f6;
        animation: spin 1s linear infinite;
        position: relative;
      }

      .loader::before {
        content: "";
        position: absolute;
        inset: 8px;
        border-radius: 50%;
        border: 6px solid transparent;
        border-left-color: #ffffff;
        border-right-color: #ffffff;
        animation: spin 1.2s linear infinite reverse;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class LoaderComponent {
  constructor(public loader: LoaderService) { }
}
