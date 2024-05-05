import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  @Output() filesUploaded = new EventEmitter<File[]>();
  uploadedFiles: File[] = [];

  onFileSelected(event: any) {
    this.uploadedFiles = Array.from(event.target.files);
  }

  uploadFiles() {
    if (this.uploadedFiles.length > 0) {
      this.filesUploaded.emit(this.uploadedFiles);
    }
  }
}
