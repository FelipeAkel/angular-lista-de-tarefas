import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';

import { IListaItens } from '../../interface/IListaItens.interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  private cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText') public inputText!: ElementRef;          // Pegando alterações do HTML, da propriedade #inputText

  @Output() public outputAddListaItem = new EventEmitter<IListaItens>();    // Enviando dados para outro component

  @Input({ required: true }) public inputListaItens: IListaItens[] = [];

  public focusAndAddItem(value: string)
  {
    if(value != ''){
      this.cdr.detectChanges();                                    // Detectando alterações!
      this.inputText.nativeElement.value = "";                     // Limpando os dados do input após a ação!

      const dataAtual = new Date();                                // Criando ID único com data
      const timestamp = dataAtual.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListaItem.emit({
        id,
        checked: false,
        value,
      });

      // console.log({ id, checked: false, value });

    }

    return this.inputText.nativeElement.focus();
  }

}
