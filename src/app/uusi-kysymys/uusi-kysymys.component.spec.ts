import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UusiKysymysComponent } from './uusi-kysymys.component';

describe('UusiKysymysComponent', () => {
  let component: UusiKysymysComponent;
  let fixture: ComponentFixture<UusiKysymysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UusiKysymysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UusiKysymysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
