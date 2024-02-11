import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input()
  public characterList: Character[] = [
    {id: uuidv4(), name: 'Trunks', power:10}
  ]

  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();


  onDeleteCharater(id?: string): void {
    if (!id) return;
    this.onDelete.emit(id);
  }

}
