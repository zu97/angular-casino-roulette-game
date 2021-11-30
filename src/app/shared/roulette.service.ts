import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouletteService {
  newNumber = new EventEmitter<number>();
  private interval: number|undefined;

  generateNumber() {
    return Math.floor(Math.random() * (36 + 1));
  }

  start() {
    this.interval = window.setInterval(() => {
      this.newNumber.emit(this.generateNumber());
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  getColor(number: number) {
    if (number === 0) {
      return 'zero';
    } else if (number < 0 || number > 36) {
      return 'unknown';
    }

    if ((number >= 1 && number <= 10) || (number >= 19 && number <= 28)) {
      return number % 2 === 0 ? 'black' : 'red';
    } else {
      return number % 2 !== 0 ? 'black' : 'red';
    }
  }
}
