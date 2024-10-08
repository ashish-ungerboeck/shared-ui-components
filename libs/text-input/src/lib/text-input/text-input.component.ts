import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-text-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent extends FieldType<FieldTypeConfig> {

  constructor() {
    super();
  }

  valueChange(eve: KeyboardEvent) {
    if (this.props['valueChange']) {
      this.props['valueChange'](eve, this.field);
    }
  }

  onKeyPress(eve: KeyboardEvent) {
    if (this.props['onKeyPress']) {
      this.props['onKeyPress'](eve, this.field);
    }
  }

  onBlur() {
    if (this.props['onBlur']) {
      this.props['onBlur'](this.field);
    }
  }

  getDynamicClasses() {
    return {
      'input-margin-top': this.props['className'] === 'input-margin-top',
      'position-input': this.props['className'] === 'uppercase-text',
    };
  }

  getAriaDescribedBy() {
    return this.tooltip ? `${this.field.id}-tooltip` : null;
  }

  public get label(): string { return this.props['label'] ?? ""; }
  public get placeholder(): string { return this.props['placeholder'] ?? ""; }
  public get clearbutton(): boolean { return this.props['clearbutton'] ?? false; }
  public get maxCharLength(): number { return this.props['maxCharLength'] ?? 100000; }
  public get required(): boolean { return this.props['required'] ?? false; }
  public get hideRequiredMarker(): boolean { return this.props['hideRequiredMarker'] ?? false; }
  public get tooltipClass(): string { return this.props['tooltipClass'] ?? ''; }
  public get tooltip(): string { return this.props['tooltip'] ?? ''; }
}