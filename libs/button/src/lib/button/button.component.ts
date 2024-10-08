import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
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

  public get icon(): string { return this.props['prefixIcon'] !== undefined ? this.props['prefixIcon'] : ''; }
}
