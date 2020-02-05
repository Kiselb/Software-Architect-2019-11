import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { IClientInfo, IServiceRequestsTypeInfo, ISubdivisionInfo } from '../../data';
import { ClientsService } from '../../main/clients/clients/clients.service';
import { SubdivisionsService } from '../subdivisions/subdivisions.service';
import { RequestsTypesService } from '../requests/requests/requests-types.service';
import { UploadRequestFileService } from './upload-request-file.service';

import { HttpClient, HttpHeaders } from  '@angular/common/http';

@Component({
  selector: 'app-requests-register',
  templateUrl: './requests-register.component.html',
  styleUrls: ['./requests-register.component.css']
})
export class RequestsRegisterComponent implements OnInit {

  @ViewChild('selectfilesinput', { static: true })
  filesInput: ElementRef;

  remarks: string = "";

  fgSelectFile: FormGroup = null;
  fgParameters: FormGroup = null;
  formDataSendFile: FormData = null;

  clients$: Observable<IClientInfo[]>;
  subdivisions$: Observable<ISubdivisionInfo[]>;
  types$: Observable<IServiceRequestsTypeInfo[]>;

  constructor(
    private clientsService: ClientsService,
    private requestsTypesService: RequestsTypesService,
    private subdivisionsService: SubdivisionsService,
    private uploadRequestFileService: UploadRequestFileService,
    private router: Router,
    private http: HttpClient
  ) { }

  openFileDialog() {
    this.filesInput.nativeElement.click();
  }
  onChangeFile(event) {
    if (event.target.files.length > 0) {
      this.formDataSendFile = new FormData();
      this.formDataSendFile.append('file', event.target.files[0]);
    }
  }
  
  uploadFile() {
    if (this.formDataSendFile) {
      this.formDataSendFile.set("clientId", this.fgParameters.get("ctrlClientId").value);
      this.formDataSendFile.set("subdivisionId", this.fgParameters.get("ctrlSubdivisionId").value);
      this.formDataSendFile.set("typeId", this.fgParameters.get("ctrlTypeId").value);
      this.formDataSendFile.set("dueDate", (new Date(this.fgParameters.get("ctrlDueDate").value)).toISOString());
      this.formDataSendFile.set("remarks", this.fgParameters.get("ctrlRemarks").value);
      this.uploadRequestFileService.upload(this.formDataSendFile).subscribe(response => {
        console.log(response);
      });
    //setTimeout(() => this.appStore.dispatch(uploadFile({ formData: this.formDataSendFile })), 5000); // Delay for demonstration purpose only
    }
  }
  ngOnInit() {
    this.clients$ = this.clientsService.getClients("");
    this.subdivisions$ = this.subdivisionsService.getSubdivisions("");
    this.types$ = this.requestsTypesService.getRequestsTypes();
    this.fgSelectFile = new FormGroup({
      ctrlFileName: new FormControl(),
    });
    this.fgParameters = new FormGroup({
      ctrlClientId: new FormControl(null, Validators.required),
      ctrlSubdivisionId: new FormControl(null, Validators.required),
      ctrlTypeId: new FormControl(null, Validators.required),
      ctrlDueDate: new FormControl(null, Validators.required),
      ctrlRemarks: new FormControl(),
    });

  }

}
