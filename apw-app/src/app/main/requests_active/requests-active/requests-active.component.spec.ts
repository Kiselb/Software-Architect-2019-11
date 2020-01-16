import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsActiveComponent } from './requests-active.component';

describe('RequestsActiveComponent', () => {
  let component: RequestsActiveComponent;
  let fixture: ComponentFixture<RequestsActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
