# MapAdvancedMarker

The `MapAdvancedMarker` component wraps the [`google.maps.marker.AdvancedMarkerElement` class](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement) from the Google Maps JavaScript API. The `MapAdvancedMarker` component displays a marker on the map when it is a content child of a `GoogleMap` component. Like `GoogleMap`, this component offers an `options` input as well as convenience inputs for `position`, `title`, `label`, and `clickable`, and supports all `google.maps.marker.AdvancedMarkerElement` events as outputs.

## Example

```typescript
// google-map-demo.component.ts
import {Component} from '@angular/core';

@Component({
  selector: 'google-map-demo',
  templateUrl: 'google-map-demo.html',
})
export class GoogleMapDemo {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }
}
```

```html
<!-- google-map-demo.component.html -->
<google-map height="400px"
            width="750px"
            [center]="center"
            [zoom]="zoom"
            (mapClick)="addMarker($event)">
  <map-advanced-marker *ngFor="let markerPosition of markerPositions"
              [position]="markerPosition"
              [options]="markerOptions"></map-advanced-marker>
</google-map>
```
