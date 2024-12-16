import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaAlumno3Page } from './pagina-alumno-3.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaAlumno3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaAlumno3PageRoutingModule {}
