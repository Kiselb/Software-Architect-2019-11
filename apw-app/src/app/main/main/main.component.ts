import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchClient = new FormControl('');
  searchRequest = new FormControl('');

  constructor(private httpClient: HttpClient) { }

  test() {
    console.log("Requested");
    this.httpClient.get("http://localhost:3000", {observe: 'response'}).subscribe((data) => { console.log(data); });
  }

  ngOnInit() {
  }

}
