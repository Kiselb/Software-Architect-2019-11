import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { RequestsService } from '../../requests/requests/requests.service';
import { IServiceRequestHeader } from '../../../data';
import { ITableServiceRequestHeader } from '../../requests/requests/requests.component';

@Component({
  selector: 'app-requests-new',
  templateUrl: './requests-new.component.html',
  styleUrls: ['./requests-new.component.css']
})
export class RequestsNewComponent implements AfterViewInit {

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

  displayedColumns: string[] = ['Open', 'DueDate', 'ServiceRequestTypeCode', 'StatusCode', 'ClientName', 'Remarks'];

  constructor(
    private router: Router,
    private requestsService: RequestsService,
    public dialog: MatDialog
  ) { }

  loadData(srid: string) {
    this.requestsService.getRequests("","DueDate", "DESC", 1, 20, 1).subscribe(
      data => {
        if (data) {
          this.data = data;
          this.resultsLength = this.data.length;
          if (srid) {
            this.data.forEach(element =>
              { if (element.ServiceRequestID == srid) {
                element.highlighted = true;
              }
            });
          }
        }
      },
      error => { console.dir(error); }
    );
  }
  openServiceRequestDetails(row: ITableServiceRequestHeader) {
    this.router.navigate(['/requests/' + row.ServiceRequestID]);
  }
  openEditDialog(action: string, row: ITableServiceRequestHeader) {
    this.openServiceRequestDetails(row);
  }
  ngAfterViewInit() {
    this.loadData(null);
  }

}
