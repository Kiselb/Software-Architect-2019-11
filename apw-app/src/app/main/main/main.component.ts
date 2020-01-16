import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchClient = new FormControl('');
  searchRequest = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
