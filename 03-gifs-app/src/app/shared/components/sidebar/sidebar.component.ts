import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  get tags() {
    return this.gifsService.tagsHistory;
  }

  constructor(private gifsService: GifsService) {}

  reSearch(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
