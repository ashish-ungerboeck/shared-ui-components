/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { PickListModule } from 'primeng/picklist';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-drag-drop-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormlyModule,
    MatFormFieldModule,
    PickListModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './drag-drop-list.component.html',
  styleUrl: './drag-drop-list.component.scss',
})
export class DragDropListComponent implements OnInit {
  @Input() windowContext: any;
  @Input() onClose: any;
  @ViewChild('header', { static: true }) header: any;

  constructor(
    public dialogRef: MatDialogRef<DragDropListComponent>,
    @Inject(MAT_DIALOG_DATA) public configData: any,
  ) { }

  ngOnInit() {
    this.addHeaderRowToLists();
  }

  addHeaderRowToLists() {
    const leftHeaderRow = document.createElement('div'),
      rightHeaderRow = document.createElement('div');
    if (this.configData.module === 'Venues') {
      leftHeaderRow.className = rightHeaderRow.className = 'lRowCls header';
    } else {
      leftHeaderRow.className = rightHeaderRow.className = 'referencesRowCls header';
    }
    let rowContent = '';
    this.configData.columnKeys.forEach((element: any) => {
      rowContent += `<div class="column" title="${this.configData.listBoxHeaderData[element]}">${this.configData.listBoxHeaderData[element]}</div>`
    });
    leftHeaderRow.innerHTML = rightHeaderRow.innerHTML = rowContent;
    document.getElementsByClassName('p-picklist-source')[0]?.insertAdjacentElement('beforebegin', leftHeaderRow);
    document.getElementsByClassName('p-picklist-target')[0]?.insertAdjacentElement('beforebegin', rightHeaderRow);
  }

  // ngAfterViewInit(): void {
  //   this.windowContext.window.instance.titleBarTemplate = this.header;
  // }

  btnCancelClick() {
    this.onClose();
  }

  btnSaveClick() {
    this.onClose(this.configData.data1, this.configData.data2);
  }
}
