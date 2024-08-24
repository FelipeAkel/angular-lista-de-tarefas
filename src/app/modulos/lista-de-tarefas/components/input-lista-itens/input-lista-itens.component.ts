import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface
import { IListaItens } from '../../interface/IListaItens.interface';

@Component({
  selector: 'app-input-lista-itens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-lista-itens.component.html',
  styleUrl: './input-lista-itens.component.scss'
})
export class InputListaItensComponent {

  @Input({ required:true }) public inputListaItens: IListaItens[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{ id: string; checked: boolean; }>();
  @Output() public outputUpdateItemDescricao = new EventEmitter<{ id:string, value: string; }>();

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  public updateItemDescricao(id: string, value: string) {
    return this.outputUpdateItemDescricao.emit({ id, value });
  }

}
