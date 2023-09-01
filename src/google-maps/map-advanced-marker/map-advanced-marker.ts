/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// Workaround for: https://github.com/bazelbuild/rules_nodejs/issues/1265
/// <reference types="google.maps" />

import {
  Input,
  OnDestroy,
  OnInit,
  Output,
  NgZone,
  Directive,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {Observable} from 'rxjs';

import {GoogleMap} from '../google-map/google-map';
import {MapEventManager} from '../map-event-manager';
import {MapAnchorPoint} from '../map-anchor-point';

/**
 * Default options for the Google Maps marker component. Displays a marker
 * at the Googleplex.
 */
export const DEFAULT_MARKER_OPTIONS = {
  position: {lat: 37.421995, lng: -122.084092},
};

/**
 * Angular component that renders a Google Maps marker via the Google Maps JavaScript API.
 *
 * See developers.google.com/maps/documentation/javascript/reference/marker
 */
@Directive({
  selector: 'map-advanced-marker',
  exportAs: 'mapAdvancedMarker',
})
export class MapAdvancedMarker implements OnInit, OnChanges, OnDestroy, MapAnchorPoint {
  private _eventManager = new MapEventManager(inject(NgZone));

  /**
   * Title of the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.title
   */
  @Input()
  set title(title: string) {
    this._title = title;
  }
  private _title: string;

  /**
   * Position of the marker. See:
   * developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.position
   */
  @Input()
  set position(position: google.maps.LatLngLiteral | google.maps.LatLng) {
    this._position = position;
  }
  private _position: google.maps.LatLngLiteral | google.maps.LatLng;

  /**
   * Options used to configure the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
   */
  @Input()
  set options(options: google.maps.MarkerOptions) {
    this._options = options;
  }
  private _options: google.maps.MarkerOptions;

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.animation_changed
   */
  @Output() readonly animationChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('animation_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.click
   */
  @Output() readonly mapClick: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('click');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.cursor_changed
   */
  @Output() readonly cursorChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('cursor_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.dblclick
   */
  @Output() readonly mapDblclick: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('dblclick');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.drag
   */
  @Output() readonly mapDrag: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('drag');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.dragend
   */
  @Output() readonly mapDragend: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('dragend');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.draggable_changed
   */
  @Output() readonly draggableChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('draggable_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.dragstart
   */
  @Output() readonly mapDragstart: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('dragstart');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.flat_changed
   */
  @Output() readonly flatChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('flat_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mousedown
   */
  @Output() readonly mapMousedown: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('mousedown');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mouseout
   */
  @Output() readonly mapMouseout: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('mouseout');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mouseover
   */
  @Output() readonly mapMouseover: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('mouseover');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mouseup
   */
  @Output() readonly mapMouseup: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('mouseup');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.position_changed
   */
  @Output() readonly positionChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('position_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.rightclick
   */
  @Output() readonly mapRightclick: Observable<google.maps.MapMouseEvent> =
    this._eventManager.getLazyEmitter<google.maps.MapMouseEvent>('rightclick');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.shape_changed
   */
  @Output() readonly shapeChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('shape_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.title_changed
   */
  @Output() readonly titleChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('title_changed');

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.zindex_changed
   */
  @Output() readonly zindexChanged: Observable<void> =
    this._eventManager.getLazyEmitter<void>('zindex_changed');

  /**
   * The underlying google.maps.Marker object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/marker#Marker
   */
  marker?: google.maps.marker.AdvancedMarkerElement;

  constructor(
    private readonly _googleMap: GoogleMap,
    private _ngZone: NgZone,
  ) {}

  ngOnInit() {
    if (this._googleMap._isBrowser) {
      // Create the object outside the zone so its events don't trigger change detection.
      // We'll bring it back in inside the `MapEventManager` only for the events that the
      // user has subscribed to.
      this._ngZone.runOutsideAngular(async () => {
        const {AdvancedMarkerElement} = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary;
        this.marker = new AdvancedMarkerElement(this._combineOptions());
      });
      this._assertInitialized();
      this.marker.map = this._googleMap.googleMap!;
      this._eventManager.setTarget(this.marker);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const {marker, _title, _position} = this;

    if (marker) {
      // if (changes['options']) {
      //   marker.setOptions(this._combineOptions());
      // }

      if (changes['title'] && _title !== undefined) {
        marker.title = _title;
      }

      if (changes['position'] && _position) {
        marker.position = _position;
      }
    }
  }

  ngOnDestroy() {
    this._eventManager.destroy();
    if (this.marker) {
      this.marker.map = null;
    }
  }

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getPosition
   */
  getPosition():
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | google.maps.LatLngAltitudeLiteral
    | null {
    this._assertInitialized();
    return this.marker.position || null;
  }

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getTitle
   */
  getTitle(): string | null {
    this._assertInitialized();
    return this.marker.title || null;
  }

  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getZIndex
   */
  getZIndex(): number | null {
    this._assertInitialized();
    return this.marker.zIndex || null;
  }

  /** Gets the anchor point that can be used to attach other Google Maps objects. */
  getAnchor(): google.maps.MVCObject | HTMLElement {
    this._assertInitialized();
    return this.marker;
  }

  /** Creates a combined options object using the passed-in options and the individual inputs. */
  private _combineOptions(): google.maps.marker.AdvancedMarkerElementOptions {
    const options = this._options || DEFAULT_MARKER_OPTIONS;

    return {
      ...options,
      collisionBehavior: google.maps.CollisionBehavior.REQUIRED,
      title: this._title || options.title,
      position: this._position || options.position,
      map: this._googleMap.googleMap,
    };
  }

  private _assertInitialized(): asserts this is {marker: google.maps.marker.AdvancedMarkerElement} {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!this._googleMap.googleMap) {
        throw Error(
          'Cannot access Google Map information before the API has been initialized. ' +
            'Please wait for the API to load before trying to interact with it.',
        );
      }
      if (!this.marker) {
        throw Error(
          'Cannot interact with a Google Map AdvancedMarker before it has been ' +
            'initialized. Please wait for the AdvancedMarker to load before trying to interact with it.',
        );
      }
    }
  }
}
