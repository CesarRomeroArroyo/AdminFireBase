import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './componentes/usuario/usuario/usuario.component';
import { MenuConfiguracionComponent } from './componentes/configuracion/menu-configuracion/menu-configuracion.component';


const APP_ROUTES: Routes = [
    { path: '', component: UsuarioComponent },
    { path: '**', pathMatch: 'full', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
