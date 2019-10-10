import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMenuBtn]'
})
export class MenuBtnDirective {

  constructor(private Element: ElementRef) {}
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight();
  }
  
  private highlight() {
    this.Element.nativeElement.classList.toggle("menuBtnMouse");
  }

}
