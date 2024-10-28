import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent extends FieldType<FieldTypeConfig> {
  datePickerPopupSettings = {
    popupClass: 'date-picker-popup',
  };

  onDateSelect() {
    if (this.props['onDateChange']) {
      this.props['onDateChange'](this.field, this.form);
    }
  }

  public get dateFormat(): string { return this.props['dateFormat'] ?? 'MM/dd/yyyy'; }
  public get label(): string { return this.props['label'] ?? ""; }
  public get required(): boolean { return this.props['required'] ?? false; };
}
