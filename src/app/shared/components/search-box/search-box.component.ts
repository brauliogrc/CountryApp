import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Input() public placeholder: string = 'Search';
  @Output() onValue = new EventEmitter<string>();

  public emitValue( value: string ): void {
    console.log(value);
    this.onValue.emit(value);
  }
}
