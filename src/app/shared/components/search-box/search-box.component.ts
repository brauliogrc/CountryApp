import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription; // Opcional por que en algun punto del tiempo no tenemos subscripcion
 
  @Input() public placeholder: string = 'Search';
  @Input() public initialValue: string = '';
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>(); // El debounce es la funcion que hace que se ejecute una accion cuando el usuario deja de escribir por un momento

  ngOnInit(): void {
    
    this.debouncerSubscription = this.debouncer.pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    } );
  }

  ngOnDestroy(): void {
    /**
     * Cada que se tenga un "subscribe" en algun componente (a excepcion de los serices, donde se usa http.get, http.post, etc)
     * necesitamos limpiar las subscripciones, por que en este caso, el dabounce siempre estara escuchando las emiciones a pesar
     * de que el componente ya no exista.
     * En las peticiones (como http.get de paquete http por ejemplo) se cancela la subscription con el operador llamado take, el cual cancela la
     * subscripcion tan pronco como se reciba un valor
     */
    this.debouncerSubscription?.unsubscribe();
  }

  public emitValue( value: string ): void {
    console.log(value);
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next(searchTerm);
  }
}
