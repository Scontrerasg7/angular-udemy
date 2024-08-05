
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent{
  public nameLower: string = 'sebastian';
  public nameUpper: string = 'SEBASTIAN';
  public nameWeird: string = 'SeBaSTIan';

  public customDate: Date = new Date();
}
