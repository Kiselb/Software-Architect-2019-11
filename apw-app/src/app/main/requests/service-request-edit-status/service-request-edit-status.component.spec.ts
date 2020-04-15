import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestEditStatusComponent } from './service-request-edit-status.component';

describe('ServiceRequestEditStatusComponent', () => {
  let component: ServiceRequestEditStatusComponent;
  let fixture: ComponentFixture<ServiceRequestEditStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestEditStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
