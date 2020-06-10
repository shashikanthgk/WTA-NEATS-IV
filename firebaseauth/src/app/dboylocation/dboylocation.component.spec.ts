import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DboylocationComponent } from './dboylocation.component';

describe('DboylocationComponent', () => {
  let component: DboylocationComponent;
  let fixture: ComponentFixture<DboylocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DboylocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DboylocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
