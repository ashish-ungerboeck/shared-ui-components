import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@shared-material-ui-library/text-input';
import { TextareaComponent } from '@shared-material-ui-library/textarea';
import { ButtonComponent } from '@shared-material-ui-library/button';
import { AutocompleteComponent } from '@shared-material-ui-library/autocomplete';
import { FieldWrapperComponent } from '@shared-material-ui-library/field-wrapper';
import { DatePickerComponent } from '@shared-material-ui-library/date-picker';
import { PasswordInputComponent } from 'm-password-input';
import { MultiSelectComponent } from 'm-multi-select';
import { FileSelectComponent } from 'm-file-select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormlyModule.forRoot({
      wrappers: [
        { name: 'field-wrapper', component: FieldWrapperComponent }
      ],
      types: [
        {
          name: 'text-input',
          component: TextInputComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'textarea',
          component: TextareaComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'autocomplete',
          component: AutocompleteComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'date',
          component: DatePickerComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'password',
          component: PasswordInputComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'multi-select',
          component: MultiSelectComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'file-select',
          component: FileSelectComponent,
          wrappers: ['field-wrapper']
        },
        {
          name: 'button',
          component: ButtonComponent,
          wrappers: ['field-wrapper']
        },
      ],
    }),
    FormlyMaterialModule,
  ]
})
export class CustomFormlyModule { }
