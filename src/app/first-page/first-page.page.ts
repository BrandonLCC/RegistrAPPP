import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../service/autenticacion.service';

//Con estas importaciones nos ayudara a las validaciones de los input (test con jassmin)
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})

export class FirstPagePage implements OnInit {
  loginFormulario: FormGroup; //Formulario 
  mensaje: string = ''; //Mensaje de error o exito 
  correo: string = ''; // Declaro la propiedad username
  contrasena: string = ''; // Declaro la propiedad password
  inputValidoPass: boolean = true; //El focus del login
  logueado: boolean = false; //Si los datos exiten, permitira acceder al sistema

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private aut: AutenticacionService) {

    //Inicializar el formulario 
    this.loginFormulario = this.formBuilder.group({
      //Required: Requerido o que es obligatorio
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],

    });

  }

  ngOnInit() {

  }

  ionViewDidLeave() {
    console.log("Limpiando datos al cambiar de pagina");
    this.inputValidoPass = true;
    this.correo = '';
    this.contrasena = '';
    this.mensaje = '';

  }


  //El metodo que se ejecuta al presionar el boton iniciar sesion
  gotoSecondPage() {
    const { correo, contrasena } = this.loginFormulario.value
    // Validar usuario en la base de datos

    
    this.authService.validateUser(this.correo, this.contrasena).subscribe(

      response => {
        Haptics.impact({ style: ImpactStyle.Medium });

        //Aqui utilizamos la autorizacion para los usuarios logueados
        this.aut.iniciarSesion();
        // Si la validación es exitosa, navegar a la segunda página

        //cendsWith  si una cadena de texto (string) termina en 
        if (correo.endsWith('@profesor.com')) {
          this.mensaje = 'Inicio de sesión exitoso';
          this.router.navigate(['/second-page'], { state: { correo: this.correo } });

        } else if (correo.endsWith('@duocuc.cl')) {
          this.router.navigate(['/pagina-alumno-1'], { state: { correo: this.correo } });
          this.mensaje = 'Inicio de sesión exitoso';

        } else {
          this.mensaje = "Correo o contraseña incorrecta. Intente nuevamente.";

        }

      },
      error => {
        Haptics.impact({ style: ImpactStyle.Heavy });
        this.inputValidoPass = false;

      });



  }
  // Navegación a la tercera pagina 
  gotoThirdPage() {
    this.router.navigateByUrl('/third-page', { state: { correo: this.correo } });

  }

  // Este método se ejecuta al hacer clic en el botón
  gotoregister() {
    console.log('correcto');
    this.router.navigateByUrl('/register');
  }
}