import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITableServiceRequestHeader } from '../requests/requests.component';
import { ServiceRequestHeaderService } from '../service-request-edit-dialog/service-request-header.service';

@Component({
  selector: 'app-service-request-edit-status',
  templateUrl: './service-request-edit-status.component.html',
  styleUrls: ['./service-request-edit-status.component.css']
})
export class ServiceRequestEditStatusComponent implements OnInit {

  states = [
    { id: 1, name: "Accepted", code: "ACC" },
    { id: 2, name: "Approved", code: "APP" },
    { id: 3, name: "Rejected", code: "REJ" },
    { id: 4, name: "InProcess", code: "PRO" },
    { id: 5, name: "Canceled", code: "CAN" },
    { id: 6, name: "Completed", code: "COM" },
    { id: 7, name: "Archived", code: "ARC" },
  ];
  local_data: ITableServiceRequestHeader;

  constructor(
    public dialogRef: MatDialogRef<ServiceRequestEditStatusComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ITableServiceRequestHeader,
    private serviceRequestHeaderService: ServiceRequestHeaderService
  )
  {
    this.local_data = data;
  }

  ngOnInit() {
    this.serviceRequestHeaderService.getRequests(this.local_data.ServiceRequestID).subscribe(
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
