
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent implements OnInit{
  ngOnInit(): void {
    console.log('Hello World')
  }

}
