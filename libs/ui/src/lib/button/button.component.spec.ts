import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { ChangeDetectorRef } from '@angular/core';

export async function runOnPushChangeDetection<T>(
  fixture: ComponentFixture<T>
): Promise<void> {
  const cd =
    fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  cd.detectChanges();
  await fixture.whenStable();
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button', async () => {
    component.isDisabled = true;
    await runOnPushChangeDetection(fixture);
    expect(
      fixture.debugElement.query(By.css('.button__primary--disabled'))
    ).toBeTruthy();
  });
});
