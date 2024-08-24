import { Component, Input } from '@angular/core';
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

}
