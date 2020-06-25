import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCurrentListButtonComponent } from './add-to-current-list-button.component';

describe('AddToCurrentListButtonComponent', () => {
  let component: AddToCurrentListButtonComponent;
  let fixture: ComponentFixture<AddToCurrentListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCurrentListButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCurrentListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
