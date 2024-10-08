/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-autocomplete',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule,
    MatTooltipModule,
    MatIconModule,
    FormlyModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent extends FieldType<FieldTypeConfig> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatAutocompleteTrigger, { static: true }) inputTrigger!: MatAutocompleteTrigger; // Reference to the input
  @ViewChild('defaultTemplate', { static: true }) private defaultTemplate!: TemplateRef<any>; // Reference to Default template for autocomplete options
  @ViewChild('accountTemplate', { static: true }) private accountTemplate!: TemplateRef<any>; // Reference to Account-specific template
  @ViewChild(MatAutocomplete, { static: true }) autocomplete!: MatAutocomplete; // Reference to MatAutocomplete
  dataSubject = new BehaviorSubject<any[]>([]); // Subject to hold data for filtering

  onDestroy$ = new Subject<void>(); // Subject for cleanup on component destruction
  value: any = ''; // Current input value
  dataSet: any[] = []; // Filtered data set
  localFiltered = false; // Flag to indicate if local filtering is active
  selectedOption!: MatOption;

  constructor() {
    super();
  }

  ngOnInit() {
    // Subscribe to data updates
    // This is used to update visibility of the selected item in the autocomplete
    // If this code requires in case where options are assigned later i.e. remote data
    this.dataSubject.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      debounceTime(1000))
      .subscribe(data => {
        if (data.length > 0) {
          // Update form control value without emitting events
          this.formControl.setValue(this.formControl.value, { emitViewToModelChange: true });
        }
      });
  }

  ngAfterViewInit() {
    // If filtering is enabled, subscribe to value changes
    if (this.field.props && this.filterable) {
      this.formControl.valueChanges.pipe(
        takeUntil(this.onDestroy$),
        distinctUntilChanged(),
        debounceTime(300)
      ).subscribe(value => {
        this.value = value; // Update internal value
        setTimeout(() => {
          // Call the provided filter function with the current value
          this.field.props['onFilter'](value, null);
        }, 0);
      });
    }
  }

  handleFilter(event: any) {
    // Handle input filtering
    if (!this.filterable) {
      const inputElement = event.target as HTMLInputElement;
      this.value = inputElement.value.toLowerCase(); // Normalize input value
      // If not filterable, use local filtering
      this.localFiltered = true;
      if (this.value !== "") {
        // Filter the source data based on the input value
        this.dataSet = this.source.filter(
          (s: any) => s[this.labelProp] && s[this.labelProp].toLowerCase().indexOf(this.value.toLowerCase()) !== -1
        );
      } else {
        // Reset to the complete source if input is empty
        this.dataSet = [...this.source];
      }
    }
  }

  clearValue() {
    // Clear the input and reset form control
    this.value = '';
    this.formControl.setValue('');
    this.dataSet = [...this.source]; // Reset data set
  }

  onBlur() {
    // Handle blur event, updating value if autocomplete is open
    // This is necessary to ensure the correct value is set when the user clicks outside the autocomplete
    const value = this.formControl.value;
    if (this.data.length > 0) {
      const dataItem = this.data.find((item: any) => item[this.valueProp] === value) || {};
      this.formControl.patchValue(dataItem[this.valueProp] ?? ''); // Update form control value
    } else {
      this.formControl.patchValue('');
    }
  }

  ngOnDestroy() {
    // Cleanup subscriptions on component destruction
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  displayFunction = (value: any) => {
    if (value && value instanceof Object) {
      return value[this.labelProp]; // Display label for object
    } else if (typeof (value) == 'string' && value.length && this.data.length > 0) {
      const item = this.data.find((item: any) => item[this.valueProp] === value);
      return item ? item[this.labelProp] : ''; // Return label or empty string
    }
    return '';
  }

  onOptionSelected(event: any) {
    const selectedValue = event.option.value; // Get the selected option's value
    this.formControl.setValue(selectedValue); // Update the model with the selected value
    this.selectedOption = selectedValue; // Store the selected option if needed

    // Reset the filtered data to show all items after selection
    this.localFiltered = false; // Indicate that we are not filtering anymore
    this.dataSet = [...this.source]; // Show all options in the dropdown
  }

  // Getters for form field properties
  public get isPrimitive(): boolean { return this.props['valuePrimitive'] ?? true };
  public get placeholder(): string { return this.props.placeholder ?? '' };
  public get label(): string { return this.props['label'] ?? '' };
  public get labelProp(): string { return this.props['labelProp'] ?? 'Name' };
  public get valueProp(): string { return this.props['valueProp'] ?? 'Id' };
  public get required(): boolean { return this.props['required'] ?? false };
  public get source(): any { return this.props['options'] ?? [] };
  public get virtual(): boolean { return this.props['virtual'] ?? false };
  public get filterable(): boolean { return this.props['onFilter'] !== undefined ? true : false };

  // Getter to provide data for the autocomplete options
  public get data(): any {
    setTimeout(() => {
      this.dataSubject.next(this.source); // Update the data subject with the current source
    }, 0);
    return this.localFiltered ? this.dataSet : this.source; // Return filtered or complete source
  }

  // Determine which template to use for displaying autocomplete options
  public get template(): TemplateRef<any> {
    switch (this.props['template']) {
      case 'accountTemplate':
        return this.accountTemplate; // Use account template if specified
      default:
        return this.defaultTemplate; // Use default template
    }
  }

  public get loading(): boolean { return this.props['loading'] ?? false }; // Check loading state
  public get tooltipClass(): string { return this.props['tooltipClass'] ?? '' };
  public get tooltip(): string { return this.props['tooltip'] ?? '' };

  isSelected(dataItem: any): boolean {
    return this.formControl.value === dataItem[this.valueProp];
  }
}
