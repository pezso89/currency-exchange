import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() inputType = 'text';
  @Input({ required: true }) label!: string;
  @Input({ required: true }) inputId!: string;
  @Input({ required: true }) inputControlName!: string;
  @Input({ required: true }) parentForm!: FormGroup;

  get isDirtyOrTouched(): boolean | undefined {
    return (
      this.parentForm.get(this.inputControlName)?.dirty ||
      this.parentForm.get(this.inputControlName)?.touched
    );
  }
}
