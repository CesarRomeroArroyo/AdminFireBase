import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NavPerfilComponent } from './componentes/nav-perfil/nav-perfil.component';
import { UsuarioComponent } from './componentes/usuario/usuario/usuario.component';
import { MenuConfiguracionComponent } from './componentes/configuracion/menu-configuracion/menu-configuracion.component';


import { usuarioReducer } from './reducers/usuario.reducer';
import { UsuarioEffects } from './effects/usuario.effects';

import { menuReducer } from './reducers/menu.reducer';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AppSettings } from './app.settings';
import { FirebaseService } from './servicios/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    NavPerfilComponent,
    UsuarioComponent,
    MenuConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    EffectsModule.forRoot([ UsuarioEffects ]),
    StoreModule.forRoot({
      usuarios: usuarioReducer,
      menu: menuReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    FirebaseService,
    AppSettings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
