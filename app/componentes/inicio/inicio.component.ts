import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalstorageService } from '../../servicios/localstorage.service';

declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  @Output() singOut = new EventEmitter<void>();
  user: any;
  constructor(private localstorageService: LocalstorageService) { }

  ngOnInit() {
    $('.dropdown-button').dropdown();
    this.user = JSON.parse(this.localstorageService.obtener('USER_DOMICILIOS'))[0];
    console.log(this.user);
  }

  onsingOut() {
    this.singOut.emit();
  }

}
