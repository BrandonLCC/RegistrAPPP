import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-eight-page',
  templateUrl: './eight-page.page.html',
  styleUrls: ['./eight-page.page.scss'],
})
export class EightPagePage implements OnInit {

  qrCodeUrl: string | null = null;
  resultadoScaneo: string = '';

  constructor(private modalController: ModalController, 
              private platform: Platform) {}

  ngOnInit(): void {
    if(this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  generateQR(): void {
    const loginUrl = 'http://192.168.1.9:3000/first-page'; // URL del login
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      loginUrl
    )}&size=200x200`;
  }






  /*

  async startScan(): Promise<void> {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false, // Desactivar el fondo negro

      componentProps: {
        formats: [], // Formatos de código de barras
        lensFacing: LensFacing.Back, // Cámara trasera

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

  */
}
