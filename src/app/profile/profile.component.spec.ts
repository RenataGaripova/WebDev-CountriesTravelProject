import { ComponentFixture, TestBed } from '@angular/core/testing';
// Удаляем лишний импорт Component, если он был
import { ProfileComponent } from './profile.component'; // Импортируем ТОЛЬКО ProfileComponent
// Можно добавить импорты для форм, если будете тестировать форму
// import { ReactiveFormsModule } from '@angular/forms';

describe('ProfileComponent', () => { // Оставляем ОДИН describe блок
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Добавляем ReactiveFormsModule, если он используется в imports компонента
      imports: [ProfileComponent /* , ReactiveFormsModule */ ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // Часто лучше вызывать detectChanges() внутри it(), а не здесь
  });

  it('should create', () => {
    fixture.detectChanges(); // Вызываем здесь для инициализации ngOnInit
    expect(component).toBeTruthy();
  });

  // Здесь можно добавить другие тесты...
});

// ---- УДАЛИТЕ ОТСЮДА ВСЕ, ЧТО КАСАЛОСЬ MyProfileComponent ----