import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EightPagePageRoutingModule } from './eight-page-routing.module';

import { EightPagePage } from './eight-page.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EightPagePageRoutingModule, 
  ],
  declarations: [EightPagePage, BarcodeScanningModalComponent]     //este es el modal para el escaneo

})
export class EightPagePageModule {}
