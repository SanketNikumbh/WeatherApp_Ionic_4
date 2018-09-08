import { constant } from './constants';
import { properties } from './properties';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  _latitude: number;
  _longitude: number;
  constructor(private _http: HttpClient) {}

  /**
   * Get method for Latitude
   * @returns Latitude
   */
  getLatitude(): number {
    return this._latitude;
  }

  /**
   * Set method for Latitude
   * @param {number} lat : Latitude of current location
   * @memberof WeatherService
   */
  setLatitude(lat: number) {
    this._latitude = lat;
  }

  /**
   * Set method for Longitude
   * @param {number}  lon : Longitude
   */
  setLongitude(lon: number) {
    this._longitude = lon;
  }
  /**
   *Get method for Longitude
   * @returns Longitude
   * @memberof WeatherService
   */
  getLongitude(): number {
    return this._longitude;
  }

  /**
   * service function to call weather api
   *
   * @param {number} [lat] : Latitude of current location
   * @param {number} [lon] : Longitude of current location
   * @param {string} [city] : Name of City
   * @returns : Observable<any>
   * @memberof WeatherService
   */
  getWeather(lat?: number, lon?: number, city?: string): Observable<any> {
    let url =
      properties.getWeatherUrl + constant.APP_ID + constant.APP_ID_VALUE;
    url = lat ? url + constant.LATITUDE + lat : url;
    url = lon ? url + constant.LONGITUDE + lon : url;
    url = city ? url + constant.CITY + city : url;
    return this._http.get(url).pipe(map((response: any) => response));
  }
}
