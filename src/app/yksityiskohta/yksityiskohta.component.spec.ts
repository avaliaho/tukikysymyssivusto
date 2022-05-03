import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YksityiskohtaComponent } from './yksityiskohta.component';

describe('YksityiskohtaComponent', () => {
  let component: YksityiskohtaComponent;
  let fixture: ComponentFixture<YksityiskohtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YksityiskohtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YksityiskohtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
