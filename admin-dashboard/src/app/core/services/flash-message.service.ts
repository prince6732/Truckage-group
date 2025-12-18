import { Injectable, signal } from '@angular/core';

export type FlashMessageType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  message = signal<string | null>(null);
  type = signal<FlashMessageType>('success');
  visible = signal<boolean>(false);

  private timeoutId: any;

  show(
    message: string,
    type: FlashMessageType = 'success',
    duration: number = 2000
  ): void {
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => this.hide(), duration);
  }

  hide(): void {
    this.visible.set(false);
  }
}
