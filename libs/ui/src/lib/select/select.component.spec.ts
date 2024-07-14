import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('SelectComponent', () => {
  const form = new FormGroup({
    amount: new FormControl(null, Validators.required),
  });
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.parentForm = form;
    component.inputControlName = 'amount';
    component.label = 'From';
    component.placeholder = 'placeholder';
    component.selectId = 'from-amount';
    component.options = [{ id: 'USD', label: 'USD' }];
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
