import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagina-alumno-1',
  templateUrl: './pagina-alumno-1.page.html',
  styleUrls: ['./pagina-alumno-1.page.scss'],
})
export class PaginaAlumno1Page implements OnInit {
  correo: string = ''; // Declara la propiedad correo

  constructor(private router: Router) { }

  ngOnInit() {

     // Acceder al estado pasado desde la primera página
     const navigation = this.router.getCurrentNavigation();
     if (navigation && navigation.extras.state) {
       this.correo = navigation.extras.state['correo'];
     }
  }

}
