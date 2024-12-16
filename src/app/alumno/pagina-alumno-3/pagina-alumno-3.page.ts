import { Component, OnInit } from '@angular/core';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, Platform } from '@ionic/angular';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-pagina-alumno-3',
  templateUrl: './pagina-alumno-3.page.html',
  styleUrls: ['./pagina-alumno-3.page.scss'],
})
export class PaginaAlumno3Page implements OnInit {
  qrCodeUrl: string | null = null;
  resultadoScaneo: string = '';
  
  constructor(private modalController: ModalController, 
              private platform: Platform 
            
            ) { }

  ngOnInit(): void {
    if(this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async startScan(): Promise<void> {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,

      componentProps: {
        formats: [], 
        lensFacing: LensFacing.Back, 

      },
    });

    
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data ) {
      this.resultadoScaneo = data?.barcode?.displayValue;
      console.log('Resultado del escaneo:', this.resultadoScaneo);
    } else {
      console.log('No se detectó ningún código.');
    }
  }

  //Para agregar una imagen qr y que el sistema lo reconozca 

  async leerQrImg(){
    const { files } = await FilePicker.pickImages ({});
  
    const path = files[0]?.path
    if(!path) return;

    const { barcodes } = await BarcodeScanner.readBarcodesFromImage ({
      path,
      formats: []
    })

    this.resultadoScaneo = barcodes[0].displayValue;

  }
  

}
