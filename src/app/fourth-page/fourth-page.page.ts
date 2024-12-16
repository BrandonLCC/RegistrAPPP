
import { Component, OnInit, viewChild, viewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-fourth-page',
  templateUrl: './fourth-page.page.html',
  styleUrls: ['./fourth-page.page.scss'],
})
export class FourthPagePage implements OnInit {
  lenghtCursos: number=0;

  constructor(private router:Router, private authService:AuthService) {}

  idUsuario: number = 1;  // Ejemplo: id del profesor (puede ser obtenido dinámicamente)
  cursos: any[] = [];

  ngOnInit() {
 
    this.authService.obtenerCursosProfesor(this.idUsuario)
    .subscribe(response => {
      this.cursos = response.cursos;
    }, error => {
      console.error(error);
    });
  }

  

  irPagina5ConDatos (curso: any){
    this.router.navigate(['/five-page'], {
      state: {
        cursoSeleccionado: curso,
      },
    });
  }

}

