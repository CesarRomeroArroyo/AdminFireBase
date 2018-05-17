import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UsuarioModel } from './../../../models/usuario.model';
import { AppState } from './../../../app.state';
import * as UsuarioActions from './../../../actions/usuario.actions';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  usuarios: Observable<UsuarioModel[]>;
  usuarioNuevo: UsuarioModel;
  constructor( private store: Store<AppState> ) {
    this.usuarios = this.store.select('usuarios');
    this.store.dispatch(new UsuarioActions.GetUsuario());
  }

  ngOnInit() {  }


  deleteUsuario(i) {
    this.store.dispatch(new UsuarioActions.RemoveUsuario(i));
  }

}
