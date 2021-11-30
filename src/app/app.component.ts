import { Component, OnInit } from '@angular/core';
import { RouletteService } from './shared/roulette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  numbers: number[] = [];
  isStarted = false;

  constructor(
    private rouletteService: RouletteService,
  ) {}

  ngOnInit() {
    this.rouletteService.newNumber.subscribe(number => {
      this.numbers.push(number);
    });
  }

  start() {
    if (this.isStarted) {
      return;
    }

    this.rouletteService.start();
    this.isStarted = true;
  }

  stop() {
    this.rouletteService.stop();
    this.isStarted = false;
  }

  reset() {
    this.numbers = [];
    this.stop();
  }
}
