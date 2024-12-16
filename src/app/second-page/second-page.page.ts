import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../service/autenticacion.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.page.html',
  styleUrls: ['./second-page.page.scss'],
})

export class SecondPagePage implements OnInit {
  correo: string = ''; // Declara la propiedad correo
  qrCodeUrl: string | null = null;

  constructor(private router: Router, private auth: AutenticacionService) { }
 
  generateQR() {
    const loginUrl = 'http://localhost:8100/first-page'; // URL del login
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      loginUrl
    )}&size=200x200`;
  }

  ngOnInit() {
    // Acceder al estado pasado desde la primera página
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.correo = navigation.extras.state['correo'];
    }
  }

  // Función para tomar la foto
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    // Aquí puedes usar la imagen capturada (image.webPath es la URL de la foto)
    console.log(image.webPath);

    // Si deseas mostrarla en la página, puedes usar la URL:
    const imageUrl = image.webPath;

    // Este es un ejemplo de cómo podrías usarla en el HTML:
    // <img [src]="imageUrl" />
  }

  

}
