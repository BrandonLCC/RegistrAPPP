import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaAlumno1Page } from './pagina-alumno-1.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaAlumno1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaAlumno1PageRoutingModule {}
