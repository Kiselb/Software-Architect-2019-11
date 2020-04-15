//https://www.freakyjolly.com/angular-7-8-edit-add-delete-rows-in-material-table-with-using-dialogs-inline-row-operation/

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITableServiceRequestHeader } from '../requests/requests.component';
import { ServiceRequestHeaderService } from './service-request-header.service';

@Component({
  selector: 'app-service-request-edit-dialog',
  templateUrl: './service-request-edit-dialog.component.html',
  styleUrls: ['./service-request-edit-dialog.component.css']
})
export class ServiceRequestEditDialogComponent implements OnInit {

  srid: string;
  local_data: ITableServiceRequestHeader;

  constructor(
    public dialogRef: MatDialogRef<ServiceRequestEditDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ITableServiceRequestHeader,
    private serviceRequestHeaderService: ServiceRequestHeaderService
  )
  {
    this.srid = data.ServiceRequestID;
    this.local_data = data;
  }

  ngOnInit() {
    this.serviceRequestHeaderService.getRequests(this.srid).subscribe(
      data => this.local_data = data,
      error => console.dir(error)
    );
  }
  doSave(){
    this.dialogRef.close({event: 'Save', data: this.local_data});
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
