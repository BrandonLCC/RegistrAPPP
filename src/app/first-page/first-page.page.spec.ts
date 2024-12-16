import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstPagePage } from './first-page.page';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
 
describe('FirstPagePage', () => {
  let component: FirstPagePage;
  let fixture: ComponentFixture<FirstPagePage>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstPagePage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule 
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstPagePage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Deberia cargar la pagina: First-page o Ingreso al sistema', () => {
    expect(component).toBeTruthy();
  });

  //Test: ok  - 1 FUNCION DE INICIO DE SESION CON @PROFESOR.COM
  it('Deberia mostrar "Inicio de sesión exitoso" si los datos son válidos', () => {
    spyOn(authService, 'validateUser').and.returnValue(of(true));
    //Aqui obtenemos el login de inicio sesion 
    component.loginFormulario.setValue({ correo: 'admin@profesor.com', contrasena: 'admin' });
    component.gotoSecondPage();
    expect(component.mensaje).toBe('Inicio de sesión exitoso');
  });
 
  //Test: ok - 2  FUNCION DE INICIO DE SESION DE LOS DATOS INCORRECTOS
  it('Deberia mostrar "Correo o contraseña incorrecta. Intente nuevamente." para las credenciales invalidas', () => {
    spyOn(authService, 'validateUser').and.returnValue(of(false));
    component.loginFormulario.setValue({ correo: 'admi.com', contrasena: 'admin' });

    component.gotoSecondPage();
    expect(component.mensaje).toBe('Correo o contraseña incorrecta. Intente nuevamente.');
  
  });

  //Test: ok - 3 FUNCION DE INICIO DE SESION CON @DUOCUC.CL
  it('Deberia mostrar "Inicio de sesión exitoso" si los datos son válidos', () => {
    spyOn(authService, 'validateUser').and.returnValue(of(true));
    //Aqui obtenemos el login de inicio sesion 
    component.loginFormulario.setValue({ correo: 'admin@duocuc.cl', contrasena: 'admin' });
    component.gotoSecondPage();
    expect(component.mensaje).toBe('Inicio de sesión exitoso');
  });



  
});
