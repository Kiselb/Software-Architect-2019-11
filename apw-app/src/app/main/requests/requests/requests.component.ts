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
import { ServiceRequestEditDialogComponent } from '../service-request-edit-dialog/service-request-edit-dialog.component'
import { ServiceRequestHeaderUpdateService } from '../service-request-edit-dialog/service-request-header-update.service'

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
    public dialog: MatDialog
  ) { }

  loadData(srid: string) {
    this.requestsService.getRequests("","DueDate", "DESC", 1, 20, 2).subscribe(
      data => {
        this.data = data["SR-HEADERS"];
        this.resultsLength = this.data.length;
        console.dir(this.data);
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
      console.dir(result);
      if (result.event == 'Save') {
        this.serviceRequestHeaderUpdateService.getRequests(result.data).subscribe(
          data => { console.dir(data); this.loadData(data.serviceRequestID) },
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
