import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router

 } from '@angular/router';
@Component({
  selector: 'app-pagina-alumno-2',
  templateUrl: './pagina-alumno-2.page.html',
  styleUrls: ['./pagina-alumno-2.page.scss'],
})


export class PaginaAlumno2Page implements OnInit {  
  constructor(private router:Router, private authService:AuthService) {}

  lenghtCursos: number= 0;
  idUsuario: number = 2; 
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
    this.router.navigate(['/pagina-alumno-3'], {
      state: {
        cursoSeleccionado: curso,
      },
    });
  }

}
