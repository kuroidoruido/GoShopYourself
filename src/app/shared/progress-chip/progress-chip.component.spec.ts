import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressChipComponent } from './progress-chip.component';

describe('ProgressChipComponent', () => {
  let component: ProgressChipComponent;
  let fixture: ComponentFixture<ProgressChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
