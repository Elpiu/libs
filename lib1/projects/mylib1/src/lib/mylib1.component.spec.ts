import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylib1Component } from './mylib1.component';

describe('Mylib1Component', () => {
  let component: Mylib1Component;
  let fixture: ComponentFixture<Mylib1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mylib1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mylib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
