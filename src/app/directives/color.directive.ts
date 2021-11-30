import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { RouletteService } from '../shared/roulette.service';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnInit {
  @Input() appColor!: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private rouletteService: RouletteService,
  ) {}

  ngOnInit() {
    const color = this.rouletteService.getColor(this.appColor);
    this.renderer.addClass(this.el.nativeElement, color);
  }
}
