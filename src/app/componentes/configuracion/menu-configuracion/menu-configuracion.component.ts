import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from './../../../actions/menu.actions';
import * as fromMenu from './../../../reducers/menu.reducer';


@Component({
  selector: 'app-menu-configuracion',
  templateUrl: './menu-configuracion.component.html',
  styleUrls: ['./menu-configuracion.component.css']
})
export class MenuConfiguracionComponent implements OnInit {

    menus: Observable<any>;
    menu: fromMenu.MenuModel;
    temporal: fromMenu.MenuModel = {
        id: new Date().getUTCMilliseconds().toString(),
        icono: 'fa fa-edit',
        texto: 'Prueba',
        link: 'prueba',
        estado: 1
    };

    constructor( private store: Store<fromMenu.State> ) { }

    ngOnInit() {
      this.menus = this.store.select(fromMenu.selectAll);
    }

    crearMenu() {
      const menu: fromMenu.MenuModel = this.temporal;
      this.store.dispatch(new actions.Create(menu));
    }

}
