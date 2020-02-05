import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { IServiceRequestDetailsRow } from '../../../data';
import { ServiceRequestDetailsService } from './service-request-details.service'
import { ISingleHighlighted } from '../requests/requests.component';

export interface ITableServiceRequestDetailsRow extends IServiceRequestDetailsRow, ISingleHighlighted {}

@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.component.html',
  styleUrls: ['./service-request-details.component.css']
})
export class ServiceRequestDetailsComponent implements OnInit {

  highlight(element: any) {
    element.highlighted = !element.highlighted;
  }
  highlightDrop() {
    this.data.map(element => { if (element.highlighted) {element.highlighted  = false }; return element; })
  }
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  srid: string;
  data: ITableServiceRequestDetailsRow[] = [];
  resultsLength: number;

  displayedColumns: string[] = ['Quantity', 'PAL', 'BarCode', 'Weight', 'Volume', 'BaseX', 'BaseY', 'SKUName'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceRequestDetailsService: ServiceRequestDetailsService
  ) { }

  ngOnInit() {
    //this.srid = this.route.snapshot.paramMap.get('srid');

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.serviceRequestDetailsService.getDetails(params.get('srid')))
    ).subscribe(
      data => {
        this.data = data["SR-DETAILS"];
        this.resultsLength = this.data.length;
        console.dir(this.data);
      },
      error => console.dir(error)
    );
  }

}
