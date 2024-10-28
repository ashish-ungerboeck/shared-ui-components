/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    MatSelectTrigger,
    MatOptionModule,
    MatFormFieldModule
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  public showLoader = false; // Flag to show loader if needed
  @ViewChild('multiSelect', { static: false }) multiSelect!: MatSelect; // Reference to MatSelect component
  public optionsData!: any[];
  dataSubject = new BehaviorSubject<any[]>([]);
  onDestroy$ = new Subject<void>();

  constructor() {
    super();
  }

  ngOnInit() {
    // Subscribe to data updates
    // This is used to update visibility of the selected item in the autocomplete
    // If this code requires in case where options are assigned later i.e. remote data in
    // combination with compareFn
    this.dataSubject.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(data => {
      // Update form control value without emitting events
      if (data.length > 0) {
        this.formControl.setValue(this.formControl.value);
      }
    });
  }

  onValueChange($event: any) {
    this.optionsData = $event;
  }

  // Comparison function for option selection
  compareFn = (o1: any, o2: any): boolean => {
    return o1 && o2 ? o1[this.valueProp] === o2[this.valueProp] : o1 === o2; // Compare based on valueProp
  }

  ngOnDestroy() {
    // Cleanup subscriptions on component destruction
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // Getters for various properties
  public get isPrimitive(): boolean { return this.props['valuePrimitive'] ?? true };
  public get labelProp(): string { return this.props['labelProp'] ?? 'name' };
  public get valueProp(): string { return this.props['valueProp'] ?? 'id' };
  public get showInactive(): boolean { return this.props['showInactive'] ?? true };
  public get colorProp(): string { return this.props['colorProp'] ?? 'color' };
  public get isColorIcon(): string { return this.props['isColorIcon'] ?? '' };
  public get showClearButton(): boolean { return this.props['showClearButton'] ?? true };
  public get allowCustomOption(): boolean { return this.props['allowCustomOption'] ?? false };

  // Get the list of options
  public get optionList(): any {
    this.optionsData = this.form.value.activityType ?? [];
    setTimeout(() => {
      this.dataSubject.next(this.optionsData); // Emit the options data to the subject
    }, 0);
    console.log(this.optionsData);
    console.log(this.props['options']);
    return this.props['options'] ?? []; // Return the provided options
  }

  public get label(): string { return this.props['label'] ?? '' };
  public get required(): boolean { return this.props['required'] ?? false };
  public get numberOfTagsBeforeMore(): number { return this.props['numberOfTagsBeforeMore'] ?? 2 };
  public get showCheckboxes(): boolean { return this.props['showCheckboxes'] ?? true };
  public get autoClose(): boolean { return this.props['autoClose'] ?? false };
  public get groupField(): string { return this.props['groupField'] ?? '' };
  public get hideRequiredMarker(): boolean { return this.props['hideRequiredMarker'] ?? false };
  public get placeholder(): string { return this.props['placeholder'] ?? "" };
}

