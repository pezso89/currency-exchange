import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  const form = new FormGroup({
    amount: new FormControl(null, Validators.required),
  });
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.parentForm = form;
    component.inputControlName = 'amount';
    component.label = 'From';
    component.inputId = 'from-amount';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isDirtyOrTouched function should return true', async () => {
    component.parentForm.controls['amount'].markAsDirty();
    component.parentForm.controls['amount'].markAsTouched();
    fixture.detectChanges();
    expect(component.isDirtyOrTouched).toEqual(true);
  });
});
