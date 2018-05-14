import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/transversal/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NuevoComponent } from './componentes/publicaciones/nuevo/nuevo.component';
import { ListadoComponent } from './componentes/publicaciones/listado/listado.component';
import { DataTableComponent } from './componentes/transversal/data-table/data-table.component';
import { NuevoProgramaComponent } from './componentes/programas/nuevo-programa/nuevo-programa.component';
import { ListadoProgramaComponent } from './componentes/programas/listado-programa/listado-programa.component';
import { NuevaCategoriaComponent } from './componentes/categoria/nueva-categoria/nueva-categoria.component';
import { ListadoCategoriaComponent } from './componentes/categoria/listado-categoria/listado-categoria.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { CategoriasService } from './servicios/categorias.service';
import { ProgramasService } from './servicios/programas.service';
import { PublicacionesService } from './servicios/publicaciones.service';
import { AppSettings } from './app.settings';
import { LoginService } from './servicios/login.service';
import { LocalstorageService } from './servicios/localstorage.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NuevoComponent,
    ListadoComponent,
    DataTableComponent,
    NuevoProgramaComponent,
    ListadoProgramaComponent,
    NuevaCategoriaComponent,
    ListadoCategoriaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    CategoriasService,
    ProgramasService,
    PublicacionesService,
    AppSettings,
    LoginService,
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
