import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NavPerfilComponent } from './componentes/nav-perfil/nav-perfil.component';

import { usuarioReducer } from './reducers/usuario.reducer';
import { UsuarioComponent } from './componentes/usuario/usuario/usuario.component';





@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    NavPerfilComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      usuarios: usuarioReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
