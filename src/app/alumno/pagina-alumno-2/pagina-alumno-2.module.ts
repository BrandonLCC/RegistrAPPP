import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaAlumno2PageRoutingModule } from './pagina-alumno-2-routing.module';

import { PaginaAlumno2Page } from './pagina-alumno-2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaAlumno2PageRoutingModule
  ],
  declarations: [PaginaAlumno2Page]
})
export class PaginaAlumno2PageModule {}
