import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListaItensComponent } from './input-lista-itens.component';

describe('InputListaItensComponent', () => {
  let component: InputListaItensComponent;
  let fixture: ComponentFixture<InputListaItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListaItensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputListaItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
