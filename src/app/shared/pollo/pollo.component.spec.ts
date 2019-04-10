import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolloComponent } from './pollo.component';

describe('PolloComponent', () => {
  let component: PolloComponent;
  let fixture: ComponentFixture<PolloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
