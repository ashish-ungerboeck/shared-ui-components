import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule, FormlyModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent extends FieldType {
  @HostBinding('class.disabled')
  get isDisabled() {
    return this.props.disabled;
  }

  onClick($event: MouseEvent) {
    if (!this.props.disabled && this.props["onClick"]) {
      this.props["onClick"]($event, this.form, this.model);
    }
  }

  public get prefixIcon(): string { return this.props['prefixIcon'] ?? ''; }
  public get suffixIcon(): string { return this.props['suffixIcon'] ?? ''; }
  public get text(): string { return this.props['text'] ?? ''; }
}