import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionEnergyComponent } from './prediction-energy.component';

describe('PredictionEnergyComponent', () => {
  let component: PredictionEnergyComponent;
  let fixture: ComponentFixture<PredictionEnergyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictionEnergyComponent]
    });
    fixture = TestBed.createComponent(PredictionEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
