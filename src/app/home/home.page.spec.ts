import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { ToastController, LoadingController } from '@ionic/angular';

describe('HomePage', () => {
  let toastSpy, mockHttp, loadingSpy;
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    loadingSpy = jasmine.createSpyObj('LoadingController', ['present']);
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    toastSpy = jasmine.createSpyObj('ToastController', ['show']);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ToastController, useValue: toastSpy },
        { provide: LoadingController, useValue: loadingSpy },
        { provide: HttpClient, useValue: mockHttp }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(toastSpy.show).toHaveBeenCalled();
    expect(loadingSpy.present).toHaveBeenCalled();
  });
});
