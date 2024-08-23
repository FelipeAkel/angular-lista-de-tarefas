import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListaItems } from '../../interface/IListaItems.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [InputAddItemComponent, JsonPipe],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  public addItemTarefa = signal(true);

  private setListaItems = signal<IListaItems[]>(this.parseItems());
  public getListaItems = this.setListaItems.asReadonly();     // Atribuindo o item a lista, sem alteração!

  private parseItems() {
    return JSON.parse(localStorage.getItem('@minha-lista') || '[]');
  }

  public getInputAddListaItem(value: IListaItems) {
    // console.log(value);
    // Atribuindo valor ao localStorage: F12 -> Application -> Local storage -> @minha-lista
    localStorage.setItem(
      '@minha-lista',
      JSON.stringify([...this.getListaItems(), value])
    );

    return this.setListaItems.set(this.parseItems());
  }

  public deleteAllItems(){
    localStorage.removeItem('@minha-lista');
    return this.setListaItems.set(this.parseItems());
  }
}
