import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.page.html',
  styleUrls: ['./third-page.page.scss'],
})
export class ThirdPagePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  mensaje: string = 'Este modal permite recuperar la contraseña.';
  inputExtractName: string = '';
  correo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  usuarioValido: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.inputExtractName = navigation.extras.state['nombre'];
    }
  }

  ionViewDidLeave() {
    this.mensaje = '';
    console.log("Mensaje borrado al cambiar de pagina");
  }

  async recoverPassword() {
    // Verifica si el nombre de usuario y el correo coinciden
    if (this.inputExtractName && this.correo === this.inputExtractName + '@ejemplo.com') {
      this.usuarioValido = true;
      this.mensaje = 'Usuario encontrado. Ingresa la nueva contraseña.';
    } else {
      this.mensaje = 'El usuario o correo no coinciden. Por favor intenta nuevamente.';
    }
  }

  async resetPassword() {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      this.mensaje = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.mensaje = 'Las contraseñas no coinciden. Por favor, inténtalo nuevamente.';
      return;
    }

    this.authService.resetUserPassword(this.inputExtractName, this.correo, this.nuevaContrasena).subscribe(
      async response => {
        console.log('Contraseña restablecida:', response);
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'La contraseña ha sido restablecida exitosamente.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigateByUrl('/first-page');
      },
      async error => {
        console.error('Error al restablecer la contraseña:', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al restablecer la contraseña. Inténtalo de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.nuevaContrasena, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensaje = `Contraseña actualizada para el usuario ${this.inputExtractName}.`;
    }
  }

  goBack() {
    this.router.navigateByUrl('/first-page');
  }
}
