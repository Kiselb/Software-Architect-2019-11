import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsArchiveComponent } from './requests-archive.component';

describe('RequestsArchiveComponent', () => {
  let component: RequestsArchiveComponent;
  let fixture: ComponentFixture<RequestsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
