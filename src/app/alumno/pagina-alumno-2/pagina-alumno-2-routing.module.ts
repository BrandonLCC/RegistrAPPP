import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaAlumno2Page } from './pagina-alumno-2.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaAlumno2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaAlumno2PageRoutingModule {}
