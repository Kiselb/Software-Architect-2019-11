import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { RequestsService } from './requests.service';
import { IServiceRequestHeader } from '../../../data';
import { MatIconModule } from '@angular/material/icon';
import { ServiceRequestEditDialogComponent } from '../service-request-edit-dialog/service-request-edit-dialog.component';
import { ServiceRequestHeaderUpdateService } from '../service-request-edit-dialog/service-request-header-update.service';
import { ServiceRequestEditStatusComponent } from '../service-request-edit-status/service-request-edit-status.component';

export interface ISingleHighlighted {
  highlighted?: boolean;
}

export interface ITableServiceRequestHeader extends IServiceRequestHeader, ISingleHighlighted {}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements AfterViewInit {

  highlight(element: any) {
    element.highlighted = !element.highlighted;
  }
  highlightDrop() {
    this.data.map(element => { if (element.highlighted) {element.highlighted  = false }; return element; })
  }
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  data: ITableServiceRequestHeader[] = [];
  resultsLength: number;

  displayedColumns: string[] = ['Open', 'View', 'DueDate', 'ServiceRequestTypeCode', 'StatusCode', 'ClientName', 'Remarks'];

  constructor(
    private router: Router,
    private requestsService: RequestsService,
    private serviceRequestHeaderUpdateService: ServiceRequestHeaderUpdateService,
    public dialog: MatDialog,
    public dialogStatus: MatDialog
  ) { }

  loadData(srid: string) {
    this.requestsService.getRequests("","DueDate", "DESC", 1, 20, 2).subscribe(
      data => {
        console.log("data");
        console.dir(data);
        this.data = data;
        this.resultsLength = this.data.length;
        if (srid) {
          this.data.forEach(element =>
            { if (element.ServiceRequestID == srid) {
              element.highlighted = true;
            }
          });
        }
      },
      error => { console.dir(error); }
    );
  }
  openEditDialog(action: string, row: ITableServiceRequestHeader) {
    const dialogRef = this.dialog.open(ServiceRequestEditDialogComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Save') {
        this.serviceRequestHeaderUpdateService.setHeader(result.data).subscribe(
          data => this.loadData(data.serviceRequestID),
          error => console.dir(error)
        );
      }
    });
  }
  openStatusDialog(row: ITableServiceRequestHeader) {
    const dialogRef = this.dialogStatus.open(ServiceRequestEditStatusComponent, {
      width: '500px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Save') {
        this.serviceRequestHeaderUpdateService.setStatus(result.data).subscribe(
          data => this.loadData(data.serviceRequestID),
          error => console.dir(error)
        );
      }
    });
  }
  openServiceRequestDetails(row: ITableServiceRequestHeader) {
    this.router.navigate(['/requests/' + row.ServiceRequestID]);
  }

  ngAfterViewInit() {
    this.loadData(null);
  }

}
