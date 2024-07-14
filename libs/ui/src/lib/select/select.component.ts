import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../models/select-options.model';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input({ required: true }) options!: SelectOption[];
  @Input({ required: true }) label!: string;
  @Input({ required: true }) selectId!: string;
  @Input({ required: true }) inputControlName!: string;
  @Input({ required: true }) parentForm!: FormGroup;
  @Input({ required: true }) placeholder!: string;

  get isDirtyOrTouched(): boolean | undefined {
    return (
      this.parentForm.get(this.inputControlName)?.dirty ||
      this.parentForm.get(this.inputControlName)?.touched
    );
  }
}
