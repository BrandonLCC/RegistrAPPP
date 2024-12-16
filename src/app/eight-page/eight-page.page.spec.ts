import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EightPagePage } from './eight-page.page';

describe('EightPagePage', () => {
  let component: EightPagePage;
  let fixture: ComponentFixture<EightPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EightPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
