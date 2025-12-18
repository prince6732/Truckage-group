import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {

  async confirmDelete(message: string): Promise<any> {
    return new Promise((resolve) => {
      const result = window.confirm(message);
      resolve({ isConfirmed: result });
    });
  }

  showToast(message: string, icon: 'success' | 'error' | 'warning' | 'info', duration: number): void {
    console.log(`[${icon.toUpperCase()}] ${message}`);

    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${icon === 'success' ? 'bg-green-500' :
      icon === 'error' ? 'bg-red-500' :
        icon === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
      }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, duration);
  }
}
