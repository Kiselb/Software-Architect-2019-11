import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionsRegisterComponent } from './subdivisions-register.component';

describe('SubdivisionsRegisterComponent', () => {
  let component: SubdivisionsRegisterComponent;
  let fixture: ComponentFixture<SubdivisionsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
