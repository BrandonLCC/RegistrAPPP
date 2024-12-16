import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { AutenticacionGuard } from './autenticacion.guard'; 

describe('AutenticacionGuard', () => {
  let guard: AutenticacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticacionGuard]
    });

    guard = TestBed.inject(AutenticacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
