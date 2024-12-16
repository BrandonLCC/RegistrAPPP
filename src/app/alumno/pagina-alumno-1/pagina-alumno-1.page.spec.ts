import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaAlumno1Page } from './pagina-alumno-1.page';

describe('PaginaAlumno1Page', () => {
  let component: PaginaAlumno1Page;
  let fixture: ComponentFixture<PaginaAlumno1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAlumno1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
