import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";

@Component({
    selector: 'app-image-upload',
    standalone: true,
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.css',
    imports: [NgFor, CommonModule, IconRoundButtonComponent]
})
export class ImageUploadComponent {
  @Output() filesUploaded = new EventEmitter<File[]>();
  uploadedFiles: File[] = [];

  onFileSelected(event: any) {
    this.uploadedFiles = Array.from(event.target.files);
  }

  getUploadedFileNames(): string {
    return this.uploadedFiles.map(file => file.name).join(', ');
  }

  uploadFiles() {
    if (this.uploadedFiles.length > 0) {
      this.filesUploaded.emit(this.uploadedFiles);
    } else {
      this.filesUploaded.emit([])
    }
  }

  return() {
    this.filesUploaded.emit([]);
  }
}
