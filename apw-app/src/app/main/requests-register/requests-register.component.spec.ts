import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRegisterComponent } from './requests-register.component';

describe('RequestsRegisterComponent', () => {
  let component: RequestsRegisterComponent;
  let fixture: ComponentFixture<RequestsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
