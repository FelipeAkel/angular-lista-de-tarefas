import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListaItensComponent } from '../../components/input-lista-itens/input-lista-itens.component';

// Interface
import { IListaItens } from '../../interface/IListaItens.interface';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [InputAddItemComponent, InputListaItensComponent, JsonPipe],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  public addItemTarefa = signal(true);

  private setListaItems = signal<IListaItens[]>(this.parseItens());
  public getListaItens = this.setListaItems.asReadonly();     // Atribuindo o item a lista, sem alteração!

  private parseItens() {
    return JSON.parse(localStorage.getItem('@minha-lista') || '[]');
  }

  public getInputAddListaItem(value: IListaItens) {
    // console.log(value);
    // Atribuindo valor ao localStorage: F12 -> Application -> Local storage -> @minha-lista
    localStorage.setItem(
      '@minha-lista',
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

    return localStorage.setItem(
      '@minha-lista',
      JSON.stringify(this.setListaItems())
    );
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

    return localStorage.setItem(
      '@minha-lista',
      JSON.stringify(this.setListaItems())
    );
  }

  public deleteAllItens(){
    localStorage.removeItem('@minha-lista');
    return this.setListaItems.set(this.parseItens());
  }
}

