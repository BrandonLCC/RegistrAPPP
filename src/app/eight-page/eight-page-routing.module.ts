import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EightPagePage } from './eight-page.page';

const routes: Routes = [
  {
    path: '',
    component: EightPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EightPagePageRoutingModule {}
