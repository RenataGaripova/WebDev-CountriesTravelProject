import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryImagesComponent } from './country-images.component';

describe('CountryImagesComponent', () => {
  let component: CountryImagesComponent;
  let fixture: ComponentFixture<CountryImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
