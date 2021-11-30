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
  balance = 100;
  amount = 1;
  color = 'red';

  constructor(
    private rouletteService: RouletteService,
  ) {}

  ngOnInit() {
    this.rouletteService.newNumber.subscribe(number => {
      if (number === 0 && this.color === 'zero') {
        this.balance += this.amount * 35;
      } else if (this.rouletteService.getColor(number) === this.color.toLowerCase()) {
        this.balance += this.amount;
      } else {
        this.balance -= this.amount;
      }

      this.numbers.push(number);

      if (this.isBalanceLow()) {
        this.stop();
      }
    });
  }

  start() {
    if (this.isStarted) {
      return;
    }

    if (this.isBalanceLow()) {
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
    this.balance = 100;
    this.stop();
  }

  isBalanceLow() {
    return this.balance < this.amount;
  }
}
