import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencySelectorComponent } from './currency-selector.component';
import {
  ButtonComponent,
  CardComponent,
  InputComponent,
  SelectComponent,
} from '@currency-exchange/ui';

describe('CurrencySelectorComponent', () => {
  let component: CurrencySelectorComponent;
  let fixture: ComponentFixture<CurrencySelectorComponent>;
  let store: MockStore;
  let storeSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CurrencySelectorComponent,
        CardComponent,
        SelectComponent,
        ButtonComponent,
        InputComponent,
        CardComponent,
        SelectComponent,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    storeSpy = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(CurrencySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(storeSpy).toHaveBeenCalled();
  });
});
