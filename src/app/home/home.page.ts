import { constant } from './../providers/constants';
import { WeatherService } from './../providers/weather.service';
import { Component, AfterViewInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  constructor(
    private weatherService: WeatherService,
    private toastCtrl: ToastController
  ) {}

  weather: any;
  city: string = undefined;
  latitude: number = undefined;
  longitude: number = undefined;
  BASE_URL: string;

  /**
   *Function called on refresh event
   * @param {*} event
   * @memberof HomePage
   */
  doRefresh(event) {
    setTimeout(() => {
      this.getWeatherAtCurrentLocation();
      event.target.complete();
    }, 200);
  }

  /**
   * Life cycle event used to call function after view loads
   *
   * @memberof HomePage
   */
  ngAfterViewInit(): void {
    this.BASE_URL = constant.IMAGE_URL;
    setTimeout(() => {
      this.getWeatherAtCurrentLocation();
    }, 3000);
  }

  /**
   * Function to reset location of weather.
   *
   * @memberof HomePage
   */
  reset() {
    if (!this.city) {
      this.getWeatherAtCurrentLocation();
    }
  }

  /**
   * Function to call Weather API service to get weather by coordinates
   *
   * @memberof HomePage
   */
  getWeatherAtCurrentLocation() {
    this.latitude = this.weatherService.getLatitude();
    this.longitude = this.weatherService.getLongitude();
    this.getWeather();
  }
  /**
   * Show's toast message
   * @param message : Message string to be shown
   */
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  /**
   *  Function to call API service to get weather at city
   */
   getWeather() {
    if (navigator.onLine) {
      // if user is online
      let lat, lon, city;
      if (this.city) {
        lat = undefined;
        lon = undefined;
        city = this.city;
      } else {
        lon = this.longitude;
        lat = this.latitude;
        city = undefined;
      }
    this.weatherService.getWeather(lat, lon, city).subscribe(
        result => {
          if (result && result.main) {
            result.main.temp = Number(result.main.temp - 273.15).toFixed(2);
            result.main.temp_max = Number(
              result.main.temp_max - 273.15
            ).toFixed(2);
            result.main.temp_min = Number(
              result.main.temp_min - 273.15
            ).toFixed(2);
            this.weather = result;
          }
        },
        error => {
          console.log(error);
          this.showToast('Something went wrong please try again!');
        }
      );
    } else {
      // will be called when user is offline
      this.showToast('You are offline please connect to internet!');
    }
  }
}

