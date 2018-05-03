import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListadoComponent } from './componentes/publicaciones/listado/listado.component';
import { ListadoProgramaComponent } from './componentes/programas/listado-programa/listado-programa.component';
import { ListadoCategoriaComponent } from './componentes/categoria/listado-categoria/listado-categoria.component';


const APP_ROUTES: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'listadoPublicacion', component: ListadoComponent },
  { path: 'listadoProgramas', component: ListadoProgramaComponent },
  { path: 'listadoCategorias', component: ListadoCategoriaComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
