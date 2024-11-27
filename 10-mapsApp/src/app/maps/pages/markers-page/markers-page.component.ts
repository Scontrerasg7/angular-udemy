import { Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { LngLat } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: mapboxgl.Marker
}

interface PlainMarker {
  color: string;
  lngLat: [number, number]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(-74.1, 4.667);


  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Html element not found'
    console.log(this.divMap)

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'SebasC'
    // const marker = new mapboxgl.Marker({
    //   // color: 'red'
    //   element: markerHtml
    // })
    //   .setLngLat(this.lngLat)
    //   .addTo(this.map)

    this.readMarkersFromLocalStorage();

  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: mapboxgl.LngLat, color: string) {
    if (!this.map) return;

    const marker = new mapboxgl.Marker({
      color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({color, marker});
    this.saveMarkersToLocalStorage();

    marker.on('dragend', () => {
      this.saveMarkersToLocalStorage();
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
  }

  flyTo(marker: mapboxgl.Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveMarkersToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readMarkersFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new mapboxgl.LngLat(lng, lat);
      this.addMarker(coords, color)
    })
  }

  ngOnDestroy(): void {
    this.map?.remove(); // Remuevo el mapa con todos los listeners
  }
}
