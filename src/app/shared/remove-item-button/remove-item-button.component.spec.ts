import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveItemButtonComponent } from './remove-item-button.component';

describe('RemoveItemButtonComponent', () => {
  let component: RemoveItemButtonComponent;
  let fixture: ComponentFixture<RemoveItemButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveItemButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
