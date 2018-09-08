import { WeatherService } from './providers/weather.service';
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private weatherService: WeatherService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }
  /**
   *Function to get current location of user.
   *
   * @memberof AppComponent
   */
  async getCurrentLocation() {
    await this.geolocation.getCurrentPosition().then(resp => {
        this.weatherService.setLatitude(resp.coords.latitude);
        this.weatherService.setLongitude(resp.coords.longitude);
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }

  async initializeApp() {
   await this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this.getCurrentLocation();
    });
  }
}
