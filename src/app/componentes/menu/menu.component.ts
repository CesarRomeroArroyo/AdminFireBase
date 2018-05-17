import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UsuarioModel } from './../../models/usuario.model';
import { AppState } from './../../app.state';
import * as UsuarioActions from './../../actions/usuario.actions';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarios: UsuarioModel;
  constructor( private store: Store<AppState> ) {
    this.store.select('usuarios').subscribe( data => {
      this.usuarios = data[0];
      console.log(this.usuarios);
    });


  }

  ngOnInit() {
  }

}
