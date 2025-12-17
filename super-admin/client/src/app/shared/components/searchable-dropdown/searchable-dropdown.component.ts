import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  forwardRef,
  HostListener,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChevronDown, LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LucideAngularModule],
  templateUrl: './searchable-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableDropdownComponent),
      multi: true,
    },
  ],
})
export class SearchableDropdownComponent
  implements ControlValueAccessor, OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() placeholder: string = 'Select...';
  @Input() displayProperty: string = 'name';
  @Input() valueProperty: string = 'id';
  @Input() styleProperty: string = '';
  @Output() selectionChange = new EventEmitter<any>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  selectedItem: any = null;
  isOpen: boolean = false;
  searchTerm: string = '';
  filteredItems: any[] = [];
  highlightedIndex: number = -1;
  private currentValue: number | null = null;
  @Output() inputChange = new EventEmitter<string>();

  readonly ChevronDown = ChevronDown
  readonly Plus = Plus

  @Output() addNew = new EventEmitter<void>();
  @Input() showAddButton: boolean = true;


  private onChange: any = () => { };
  private onTouched: any = () => { };

  ngOnInit(): void {
    this.filteredItems = [...this.items];
    if (this.currentValue !== null && this.items.length > 0) {
      this.updateSelectedItem();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items.length > 0) {
      this.filteredItems = [...this.items];
      if (this.currentValue !== null) {
        this.updateSelectedItem();
      }
    }
  }

  private updateSelectedItem(): void {
    if (this.currentValue !== null && this.items.length > 0) {
      this.selectedItem =
        this.items.find(
          (item) => item[this.valueProperty] === this.currentValue
        ) || null;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      this.filterItems();
      setTimeout(() => {
        this.searchInput.nativeElement.focus(), 0;
      });
    } else {
      this.onTouched();
    }
  }

  filterItems(): void {
    if (!this.searchTerm.trim()) {
      this.filteredItems = [...this.items];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredItems = this.items.filter((item) =>
        item[this.displayProperty].toLowerCase().includes(term)
      );
    }
    this.highlightedIndex = this.filteredItems.length > 0 ? 0 : -1;

    this.inputChange.emit(this.searchTerm);
  }


  selectItem(item: any): void {
    this.selectedItem = item;
    this.currentValue = item[this.valueProperty];
    this.isOpen = false;
    this.onChange(item[this.valueProperty]);
    this.selectionChange.emit(item);
  }

  writeValue(value: any): void {
    this.currentValue = value;

    if (value === null || value === undefined) {
      this.selectedItem = null;
      return;
    }

    if (this.items.length > 0) {
      this.updateSelectedItem();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const clickedInside = (event.target as HTMLElement).closest(
      'app-searchable-dropdown'
    );
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  onTriggerKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'Down':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        } else {
          this.highlightNext();
        }
        break;
      case 'ArrowUp':
      case 'Up':
        event.preventDefault();
        if (this.isOpen) {
          this.highlightPrevious();
        }
        break;
      case 'Enter':
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        } else if (
          this.highlightedIndex >= 0 &&
          this.filteredItems.length > 0
        ) {
          this.selectItem(this.filteredItems[this.highlightedIndex]);
        }
        break;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        if (this.isOpen) {
          this.isOpen = false;
        }
        break;
      case 'Tab':
        if (this.isOpen) {
          this.isOpen = false;
        }
        break;
    }
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'Down':
        event.preventDefault();
        this.highlightNext();
        break;
      case 'ArrowUp':
      case 'Up':
        event.preventDefault();
        this.highlightPrevious();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.filteredItems.length > 0) {
          this.selectItem(this.filteredItems[this.highlightedIndex]);
        }
        break;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this.isOpen = false;
        break;
    }
  }

  highlightNext(): void {
    if (this.filteredItems.length === 0) {
      return;
    }

    if (this.highlightedIndex < this.filteredItems.length - 1) {
      this.highlightedIndex++;
    } else {
      this.highlightedIndex = 0;
    }
    this.scrollToHighlighted();
  }

  highlightPrevious(): void {
    if (this.filteredItems.length === 0) {
      return;
    }

    if (this.highlightedIndex > 0) {
      this.highlightedIndex--;
    } else {
      this.highlightedIndex = this.filteredItems.length - 1;
    }
    this.scrollToHighlighted();
  }

  private scrollToHighlighted(): void {
    setTimeout(() => {
      const highlightedElement = document.querySelector(
        `app-searchable-dropdown li:nth-child(${this.highlightedIndex + 1})`
      );
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  trackByValue(index: number, item: any): any {
    return item[this.valueProperty];
  }

  onAddNew(event: Event): void {
    event.stopPropagation();
    this.addNew.emit();
  }
}
