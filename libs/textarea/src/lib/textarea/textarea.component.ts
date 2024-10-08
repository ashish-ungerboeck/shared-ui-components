import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
})
export class TextareaComponent extends FieldType<FieldTypeConfig> {

  getAriaDescribedBy() {
    return this.tooltip ? `${this.field.id}-tooltip` : null;
  }

  public get label(): string { return this.props['label'] ?? ''; }
  public get maxCharLength(): number { return this.props['maxCharLength'] ?? 100000; }
  public get placeholder(): string { return this.props['placeholder'] ?? ''; }
  public get readonly(): boolean { return this.props['readonly'] ?? false; }
  public get required(): boolean { return this.props['required'] ?? false; }
  public get textareaRow(): number { return this.props['textareaRow'] ?? 2; }
  public get tooltip(): string { return this.props['tooltip'] ?? ''; }

}
