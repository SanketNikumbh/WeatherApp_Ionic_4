import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-list',
  templateUrl: './temperature-list.component.html',
  styleUrls: ['./temperature-list.component.scss']
})
export class TemperatureListComponent implements OnInit {
  @Input() inputWeather: any;
  weather: any;

  constructor() { }

  ngOnInit() {
    console.log('called');
    this.weather = this.inputWeather;
  }

}
