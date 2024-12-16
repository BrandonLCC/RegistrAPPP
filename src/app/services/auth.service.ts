import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*
  private apiUrl = 'http://a-registrapp.duckdns.org:z/api/usuarioo';
  private validateUrl = 'http://a-registrapp.duckdns.org:3000/api/validate-user';
  private resetUrl = 'http://a-registrapp.duckdns.org:3000/api/reset-password';
*/
  /*

  private apiUrl = 'http://localhost:3000/api/usuarioo'; 
  private validateUrl = 'http://localhost:3000/api/validate-user'; // URL para validar usuario
  private resetUrl = 'http://localhost:3000/api/reset-password';
*/


private apiUrl = 'http://localhost:3000/api/usuarioo';  // Ajusta la IP externa y el puerto donde corre Angular
private validateUrl = 'http://localhost:3000/api/validate-user';
private resetUrl = 'http://localhost:3000/api/reset-password';

  constructor(private http: HttpClient) { }

  registerUser(nombre: string, correo: string, contrasena: string): Observable<any> {
    const userData = { nombre, correo, contrasena };
    return this.http.post(this.apiUrl, userData).pipe(
      catchError(err => {
        console.error('Error en el registro:', err);
        return throwError(err); // Re-lanzar el error
      })
    );
  }

  resetUserPassword(nombre: string, correo: string, nuevaContrasena: string): Observable<any> {
    const data = { nombre, correo, nuevaContrasena };
    return this.http.post(this.resetUrl, data).pipe(
      catchError(err => {
        console.error('Error al restablecer la contraseña:', err);
        return throwError(err);
      })
    );
  }

  // método para validar - autenticar usuario
  validateUser(correo: string, contrasena: string): Observable<any> {
    const data = { correo, contrasena }; 
    return this.http.post(this.validateUrl, data).pipe(
      catchError(err => {
        console.error('Error al validar el usuario:', err);
        return throwError(err);
      })
    );
  }

  obtenerCursosProfesor(idUsuario: number) {
    return this.http.get<{ cursos: any[] }>(`http://localhost:3000/api/ProfesorCurso/${idUsuario}`);
  }
  
  
}
