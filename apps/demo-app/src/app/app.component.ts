import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { CustomFormlyModule } from './custom-formly/custom-formly.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    CustomFormlyModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public form = new FormGroup({});
  public model: unknown = {};
  public options!: FormlyFormOptions;
  public fields!: FormlyFieldConfig[];

  public outlook_event_subject = [
    { "Name": "Name of the event", "Id": "name_of_the_event" },
    { "Name": "Default subject specified", "Id": "default_subject_specified" }]

  ngOnInit() {
    this.addFormFields();
  }

  addFormFields() {
    this.fields = [
      {
        key: 'title',
        type: 'text-input',
        props: {
          label: 'Title',
          required: true
        }
      },
      {
        type: 'date',
        key: 'created',
        props: {
          label: 'Created On',
          dateFormat: 'yyyy-MM-dd'
        }
      },
      {
        key: 'outlook_event_subject',
        type: 'autocomplete',
        templateOptions: {
          label: 'Outlook Event Subject',
          required: true,
          labelProp: 'Name',
          valueProp: 'Id',
          tooltip: 'Select the subject of the event',
          options: this.outlook_event_subject
        }
      },
      {
        key: 'comment',
        type: 'textarea',
        props: {
          label: 'Comment',
          required: true
        }
      },
    ];
  }

  submit() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }

}
