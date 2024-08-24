import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListaItensComponent } from '../../components/input-lista-itens/input-lista-itens.component';

// Interface
import { IListaItens } from '../../interface/IListaItens.interface';

import { ELocalStorage } from '../../enum/ELocalStora.enum';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [InputAddItemComponent, InputListaItensComponent, JsonPipe],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  private setListaItems = signal<IListaItens[]>(this.parseItens());
  private parseItens() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MINHA_LISTA) || '[]');
  }
  private updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MINHA_LISTA,
      JSON.stringify(this.setListaItems())
    );
  }

  public addItemTarefa = signal(true);
  public getListaItens = this.setListaItems.asReadonly();     // Atribuindo o item a lista, sem alteração!

  public getInputAddListaItem(value: IListaItens) {
    // Atribuindo valor ao localStorage: F12 -> Application -> Local storage -> @minha-lista
    localStorage.setItem(
      ELocalStorage.MINHA_LISTA,
      JSON.stringify([...this.getListaItens(), value])
    );

    return this.setListaItems.set(this.parseItens());
  }

  public listaItensStage(value: 'pendentes' | 'concluidas'){
    // Buscando somente os resultados filtrados com o checkted
    return this.getListaItens().filter((resultado: IListaItens) => {
      if( value === 'pendentes') {
        return !resultado.checked;  // checked = false;
      } else if( value === 'concluidas') {
        return resultado.checked;   // checked = true;
      } else {
        return resultado;
      }
    });
  }

  public updateItemCheckbox(dadosItem: { id: string; checked: boolean; }) {
    this.setListaItems.update((oldValue: IListaItens[]) => {
      oldValue.filter((resultado) => {
        if(resultado.id === dadosItem.id) {
          resultado.checked = dadosItem.checked;
        }
        return resultado;
      });

      return oldValue;
    });

    return this.updateLocalStorage();
  }

  public updateItemDescricao(dadosItem: {id: string; value: string}) {
    this.setListaItems.update((oldValue: IListaItens[]) => {
      oldValue.filter((resultado) => {
        if(resultado.id === dadosItem.id){
          resultado.value = dadosItem.value;
        }
        return resultado;
      });
      return oldValue;
    });

    return this.updateLocalStorage();
  }

  public deleteItemId(id: string) {
    this.setListaItems.update((oldValue: IListaItens[]) => {
      return oldValue.filter((resultado) => resultado.id !== id);
    });
  }

  public deleteAllItens(){
    localStorage.removeItem(ELocalStorage.MINHA_LISTA);
    return this.setListaItems.set(this.parseItens());
  }
}
