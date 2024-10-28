import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { CustomFormlyModule } from './custom-formly/custom-formly.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '@shared-material-ui-library/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DragDropListComponent } from 'm-drag-drop-list';

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
    MatSelectModule,
    ButtonComponent
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
    { "Name": "Default subject specified", "Id": "default_subject_specified" }
  ]

  public event_names = [
    { "name": "Birthday", "id": "birthday" },
    { "name": "Wedding", "id": "wedding" },
    { "name": "Engagement", "id": "engagement" },
    { "name": "Conference", "id": "conference" }
  ]

  public spacesListData = [
    { name: 'Item 1', code: 'ITM001' },
    { name: 'Item 2', code: 'ITM002' },
    { name: 'Item 3', code: 'ITM003' },
    { name: 'Item 4', code: 'ITM004' },
    { name: 'Item 5', code: 'ITM005' }
  ];

  public selectedSpaces = [];

  constructor(
    private dialog: MatDialog
  ) { }

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
        key: 'password',
        type: 'password',
        props: {
          label: 'Password',
        }
      },
      {
        type: 'date',
        key: 'created',
        props: {
          label: 'Created On',
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
        type: 'multi-select',
        key: 'activityType',
        props: {
          label: 'Activity Types',
          required: true,
          labelProp: 'name',
          valueProp: 'id',
          valuePrimitive: false
        },
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            if (field.props) {
              field.props.options = this.event_names
            }
          }
        }
      },
      {
        key: 'certificate',
        type: 'file-select',
        props: {
          label: 'Certificate',
          required: true,
          fileRestrictions: ['.pdf']
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
      {
        type: 'button',
        className: 'manage-spaces-button',
        props: {
          text: 'Map Spaces',
          btnType: 'secondary',
          prefixIcon: 'fal fa-edit',
          onClick: () => {
            const data = {
              module: 'Venues',
              title: 'Manage Venue Spaces',
              listbox1SearchLabel: 'Search Available Spaces',
              listbox1SearchPlaceholder: 'Search Available Spaces',
              columnKeys: ['baseCombo', 'name'],
              filterByKeys: 'baseCombo,name',
              listBoxHeaderData: { baseCombo: 'Base Combo', name: 'Space Name', isHeader: true },
              data1: [...this.spacesListData],
              listbox2SearchLabel: 'Search Selected Spaces',
              listbox2SearchPlaceholder: 'Search Selected Spaces',
              data2: [...this.selectedSpaces]
            };

            const config: MatDialogConfig = {
              maxWidth: window.innerWidth >= 900 ? 900 : window.innerWidth,
              minWidth: window.innerWidth >= 900 ? 900 : window.innerWidth
            };

            const dialogRef = this.dialog.open(DragDropListComponent, {
              data: data,
              ...config
            });

            // Close event
            dialogRef.afterClosed().subscribe((response) => {
              console.log(response);
            });
          },
        }
      }
    ];
  }

  submit() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }

}
