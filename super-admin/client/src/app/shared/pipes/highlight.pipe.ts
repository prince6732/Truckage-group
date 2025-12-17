import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, filterText: string): string {
    if (!filterText) {
      return text;
    }

    const regex = new RegExp(`(${filterText})`, 'gi');
    return text.replace(regex, `<span class="bg-yellow-200">$1</span>`);
  }
}
