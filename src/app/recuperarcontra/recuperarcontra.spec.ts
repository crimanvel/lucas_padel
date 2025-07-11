import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recuperarcontra } from './recuperarcontra';

describe('Recuperarcontra', () => {
  let component: Recuperarcontra;
  let fixture: ComponentFixture<Recuperarcontra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recuperarcontra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recuperarcontra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
