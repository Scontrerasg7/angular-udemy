import { Component } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: 'main-page.component.html'
})

export class MainPageComponent {
  // Habilita en todo el main page la info que está siendo declarada en el servicio
  constructor( private dbzService: DbzService ) {}

  get characters(): Character[] {
    // Con el spread hacemos una copia de los characters para asegurarnos de que la lsita no se edite
    return [...this.dbzService.characters];
  }

  onDeleteCharacter(id:string): void {
    this.dbzService.deleteCharacterById(id);
  }

  onNewCharacter(character:Character): void {
    this.dbzService.addCharacter(character);
  }

}
