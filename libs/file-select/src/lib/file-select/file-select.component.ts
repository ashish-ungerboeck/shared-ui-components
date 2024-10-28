/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-file-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormlyModule,
    MatIconModule
  ],
  templateUrl: './file-select.component.html',
  styleUrl: './file-select.component.scss',
})
export class FileSelectComponent extends FieldType<FieldTypeConfig> {

  constructor() {
    super();
  }

  @ViewChild('fileInput') fileInput: any;
  public selectedFileName = '';

  // Default file restrictions for allowed extensions
  public get allowedExtensions(): string {
    return this.fileRestrictions.join(',');
  }

  public get label(): string { return this.props['label'] ?? "" };
  public get required(): boolean { return this.props['required'] ?? false };
  public get hideRequiredMarker(): boolean { return this.props['hideRequiredMarker'] ?? false };
  public get multiple(): boolean { return this.props['multiple'] ?? false };
  public get fileRestrictions(): Array<string> { return this.props['fileRestrictions'] ?? [] };

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file ? file.name : '';
  }

  removeFile() {
    // Clear the selected file
    this.selectedFileName = '';
    this.formControl.reset();  // Reset form control value
  }
}