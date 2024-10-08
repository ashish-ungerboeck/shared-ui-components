import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'lib-field-wrapper',
  standalone: true,
  imports: [CommonModule, FormlyModule],
  templateUrl: './field-wrapper.component.html',
  styleUrl: './field-wrapper.component.css',
})
export class FieldWrapperComponent extends FieldWrapper {
  @HostBinding('class.focused') focused = false;
  @HostBinding('class.disabled') get disabled() {
    return this.props.disabled;
  }

  get labelState(): string {
    const data = ('' + this.key).split('.').reduce((prev, curr) => prev && prev[curr], this.model);

    if (this.field.type === 'multi-select' || this.field.type === 'auto-complete-multi-select'
      || this.field.type === 'groupable-multiselect') {
      if (data !== undefined && data !== null) {
        return data.length > 0 || this.focused ? 'active' : 'inactive';
      }
    }
    if (this.field.type === 'hyperlink') {
      return 'active';
    }
    if (this.field.type === 'email-picker') {
      return this.focused ? 'active' : 'inactive';
    }
    return (data !== undefined && data !== null && data !== '') || this.focused ? 'active' : 'inactive';
  }

  focus() {
    if (this.disabled) { return; }
    this.focused = true;
  }

  blur() {
    this.focused = false;
  }
}

