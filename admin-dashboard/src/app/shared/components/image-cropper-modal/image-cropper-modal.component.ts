import { Component, input, output, signal, computed, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../../core/services/image.service';
import { ImageItem } from '../../../shared/models/interface';
import { Trash2, Upload, Check, X, ImageIcon, LucideAngularModule } from 'lucide-angular';
import { environment } from '../../../../environments/environment';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-image-cropper-modal',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, ImageCropperComponent, ModalComponent],
    templateUrl: './image-cropper-modal.component.html',
    styleUrl: './image-cropper-modal.component.css'
})
export class ImageCropperModalComponent implements OnDestroy {
    private imageService = inject(ImageService);

    readonly Trash2 = Trash2;
    readonly Upload = Upload;
    readonly Check = Check;
    readonly X = X;
    readonly ImageIcon = ImageIcon;

    multiple = input<boolean>(false);
    buttonLabel = input<string>('Select Image');
    directory = input<string>('products');
    aspectRatio = input<number>(1);

    onSelect = output<string[] | string>();

    isOpen = signal(false);
    images = signal<ImageItem[]>([]);
    selectedImage = signal<string | undefined>(undefined);
    imageChangedEvent: any = '';
    croppedImage: any = '';
    isCropping = signal(false);

    errorMessage = signal<string | null>(null);
    isDeleteModalOpen = signal(false);
    imageToDelete = signal<string | null>(null);
    isDeleting = signal(false);

    uploadUrl = environment.apiUrl.replace('/api', '');

    selectedImages = computed(() =>
        this.images().filter(img => img.selected)
    );

    hasSelection = computed(() =>
        this.selectedImages().length > 0
    );

    openModal(): void {
        this.isOpen.set(true);
        this.fetchImages();
    }

    closeModal(): void {
        this.isOpen.set(false);
        this.selectedImage.set(undefined);
        this.images.set([]);
        this.errorMessage.set(null);
        this.imageChangedEvent = '';
        this.croppedImage = '';
    }

    fetchImages(): void {
        this.imageService.getFiles(this.directory()).subscribe({
            next: (urls: string[]) => {
                const imgs: ImageItem[] = urls.map(url => ({ url, selected: false }));
                this.images.set(imgs);
            },
            error: (err) => {
                console.error(err);
                this.errorMessage.set('Failed to load images.');
            }
        });
    }

    onFileSelect(event: any): void {
        this.imageChangedEvent = event;
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedImage.set(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    imageCropped(event: ImageCroppedEvent) {
        if (event.blob) {
            this.croppedImage = event.blob;
        } else if (event.base64) {
            this.croppedImage = event.base64;
        }
        console.log('Image cropped:', event);
    }

    async handleCropSave() {
        console.log('handleCropSave called, croppedImage:', this.croppedImage);

        if (!this.croppedImage) {
            console.error('No cropped image available');
            this.errorMessage.set('Please wait for the image to be cropped');
            return;
        }

        this.isCropping.set(true);

        try {
            let blob: Blob;

            if (this.croppedImage instanceof Blob) {
                blob = this.croppedImage;
            } else {
                blob = await fetch(this.croppedImage).then(res => res.blob());
            }

            const file = new File([blob], 'cropped_image.png', { type: 'image/png' });

            this.imageService.upload(file, this.directory()).subscribe({
                next: (response) => {
                    if (response.isSuccess) {
                        const uploadedUrl = response.result;

                        this.images.update(imgs => [...imgs, { url: uploadedUrl, selected: false }]);

                        this.selectedImage.set(undefined);
                        this.imageChangedEvent = '';
                        this.croppedImage = '';

                        this.fetchImages();
                    } else {
                        this.errorMessage.set(response.message || 'Upload failed');
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.errorMessage.set('Failed to upload cropped image.');
                },
                complete: () => {
                    this.isCropping.set(false);
                }
            });
        } catch (err) {
            console.error(err);
            this.errorMessage.set('Failed to process cropped image.');
            this.isCropping.set(false);
        }
    }

    toggleSelect(index: number): void {
        this.images.update(imgs => {
            if (this.multiple()) {
                return imgs.map((img, i) =>
                    i === index ? { ...img, selected: !img.selected } : img
                );
            } else {
                return imgs.map((img, i) => ({
                    ...img,
                    selected: i === index ? !img.selected : false
                }));
            }
        });
    }

    confirmDelete(url: string): void {
        this.imageToDelete.set(url);
        this.isDeleteModalOpen.set(true);
    }

    cancelDelete(): void {
        this.isDeleteModalOpen.set(false);
        this.imageToDelete.set(null);
    }

    handleDeleteConfirmed(): void {
        const urlToDelete = this.imageToDelete();
        if (!urlToDelete) return;

        this.isDeleting.set(true);

        this.imageService.delete(urlToDelete).subscribe({
            next: (response) => {
                if (response.isSuccess) {
                    this.images.update(imgs =>
                        imgs.filter(img => img.url !== urlToDelete)
                    );
                    this.cancelDelete();
                } else {
                    this.errorMessage.set(response.message || 'Delete failed');
                }
            },
            error: (err) => {
                console.error(err);
                this.errorMessage.set('Failed to delete image');
            },
            complete: () => {
                this.isDeleting.set(false);
            }
        });
    }

    handleDone(): void {
        const selected = this.selectedImages().map(img => img.url);
        this.onSelect.emit(this.multiple() ? selected : selected[0] || '');
        this.closeModal();
    }

    ngOnDestroy(): void { }
}
