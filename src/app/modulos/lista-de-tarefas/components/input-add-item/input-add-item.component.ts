import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Output, ViewChild, viewChild } from '@angular/core';

import { IListaItems } from '../../interface/IListaItems.interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  private cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText') public inputText!: ElementRef;          // Pegando alterações do HTML, da propriedade #inputText

  @Output() public outputListaItems = new EventEmitter<IListaItems>();    // Enviando dados para outro component

  public focusAndAddItem(value: string)
  {
    if(value != ''){
      this.cdr.detectChanges();                                    // Detectando alterações!
      this.inputText.nativeElement.value = "";                     // Limpando os dados do input após a ação!

      const dataAtual = new Date();                                // Criando ID único com data
      const timestamp = dataAtual.getTime();
      const id = `ID ${timestamp}`;

      this.outputListaItems.emit({
        id,
        checked: false,
        value,
      });

      // console.log({ id, checked: false, value });

    }

    return this.inputText.nativeElement.focus();
  }

}
