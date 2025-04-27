import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Map, icon, LatLngTuple, marker, Marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-fix-map',
  templateUrl: './fix-map.component.html',
  styleUrls: ['./fix-map.component.css']
})
export class FixMapComponent implements OnInit, OnChanges {
  @Input() latitude!: number;
  @Input() longitude!: number;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private map!: Map;
  private currentMarker!: Marker;

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    // Optionally, you could call initializeMap here if inputs are guaranteed to be available
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.latitude !== undefined && this.longitude !== undefined) {
      this.initializeMap();
      this.showFixedLocation();
    }
  }

  initializeMap(): void {
    if (this.map) return;

    this.map = new Map(this.mapRef.nativeElement, {
      attributionControl: false,
      center: [this.latitude, this.longitude],
      zoom: this.MARKER_ZOOM_LEVEL
    });

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  showFixedLocation(): void {
    if (!this.map || this.latitude === undefined || this.longitude === undefined) return;

    const fixedLatLng: LatLngTuple = [this.latitude, this.longitude];

    if (this.currentMarker) {
      this.currentMarker.setLatLng(fixedLatLng);
    } else {
      this.currentMarker = marker(fixedLatLng, {
        icon: this.MARKER_ICON
      }).addTo(this.map);
    }

    this.map.setView(fixedLatLng, this.MARKER_ZOOM_LEVEL);

    // Disable all map interactions
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    this.map.off('click');
    this.map.tap?.disable();

    if (this.currentMarker.dragging) {
      this.currentMarker.dragging.disable();
    }
  }
}
