import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import mapboxgl, { LngLat } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public lngLat: mapboxgl.LngLat = new mapboxgl.LngLat(-74.1, 4.667);


  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Html element not found'
    console.log(this.divMap)

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove(); // Remuevo el mapa con todos los listeners
  }

  mapListeners() {
    if (!this.map) throw 'Map not initialized yet';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    })

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(zoomValue: string) {
    this.zoom = Number(zoomValue);
    this.map?.zoomTo(this.zoom)
  }

}
