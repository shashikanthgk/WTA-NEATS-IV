import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowlocationComponent } from './showlocation.component';

describe('ShowlocationComponent', () => {
  let component: ShowlocationComponent;
  let fixture: ComponentFixture<ShowlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
