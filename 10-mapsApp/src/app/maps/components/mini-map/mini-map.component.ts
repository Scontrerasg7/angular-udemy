import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number];

  public map?: mapboxgl.Map;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Html divMap element not found'
    if (!this.lngLat) throw 'Must specify minimap coords'

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false
    });

    this.addMarker()

  }

  addMarker() {
    if (!this.map) return;
    const marker = new mapboxgl.Marker({})
      .setLngLat(this.lngLat!)
      .addTo(this.map);
  }

}
