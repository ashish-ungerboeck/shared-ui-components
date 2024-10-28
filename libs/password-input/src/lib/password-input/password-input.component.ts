import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-password-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent extends FieldType<FieldTypeConfig> {

  hidePassword = false;
  isEditing = false;

  constructor() {
    super();
  }

  get inputType(): string {
    return this.hidePassword ? 'text' : 'password';
  }

  valueChange(eve: Event) {
    if (this.props['valueChange']) {
      this.props['valueChange'](eve, this.field);
    }
    if (this.props['disabled']) {
      this.isEditing = true;
    }
  }

  onKeyPress(eve: KeyboardEvent) {
    if (this.props['onKeyPress']) {
      this.props['onKeyPress'](eve, this.field);
    }
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public get label(): string { return this.props['label'] ?? ""; }
  public get placeholder(): string { return this.props['placeholder'] ?? ""; }
  public get clearbutton(): boolean { return this.props['clearbutton'] ?? false; }
  public get maxCharLength(): number { return this.props['maxCharLength'] ?? 30; }
  public get restrictRegex(): number { return this.props['restrictRegex'] ?? undefined; }
  public get required(): boolean { return this.props['required'] ?? false; }
  public get hideRequiredMarker(): boolean { return this.props['hideRequiredMarker'] ?? false; }
}
