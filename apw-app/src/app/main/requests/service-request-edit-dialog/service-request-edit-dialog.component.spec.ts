import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestEditDialogComponent } from './service-request-edit-dialog.component';

describe('ServiceRequestEditDialogComponent', () => {
  let component: ServiceRequestEditDialogComponent;
  let fixture: ComponentFixture<ServiceRequestEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
