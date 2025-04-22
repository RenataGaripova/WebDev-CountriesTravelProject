// Импорты: Добавляем Router
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- Импортируем Router

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {
    name: 'Batyrlan',
    surname: 'Example',
    email: 'batyrlan@example.com',
    phone: '+77001234567',
    avatarUrl: 'assets/user-icon-1.png' // Убедитесь, что этот путь правильный
  };

  isEditing = false;
  profileForm!: FormGroup;

  // Внедряем Router вместе с FormBuilder
  constructor(
    private fb: FormBuilder,
    private router: Router // <-- Внедряем Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required, Validators.pattern(/^\+?[0-9\s-()]*$/)]]
    });
  }

  editProfile(): void {
    this.isEditing = true;
    this.profileForm.patchValue({
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      phone: this.user.phone
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const updatedUserData = this.profileForm.value;
    console.log('Saving data:', updatedUserData);

    // Обновляем локальный объект user (ЗАМЕНИТЕ НА ВЫЗОВ БЭКЕНДА)
    this.user.name = updatedUserData.name;
    this.user.surname = updatedUserData.surname;
    this.user.email = updatedUserData.email;
    this.user.phone = updatedUserData.phone;
    // avatarUrl здесь не обновляется, т.к. загрузка файла - отдельный процесс

    this.isEditing = false;
    console.log('Profile updated locally.');
    // Здесь можно добавить сообщение об успехе (Toast/Snackbar)
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  // --- НОВЫЙ МЕТОД: Выход ---
  logout(): void {
    console.log('Logging out...');
    // Здесь должна быть логика очистки сессии/токена
    // localStorage.removeItem('authToken'); // Пример
    // sessionStorage.removeItem('authToken'); // Пример

    // Перенаправляем на страницу входа (укажите ваш реальный путь)
    this.router.navigate(['/log-in']);
  }

  // --- НОВЫЙ МЕТОД: Обработка выбора файла аватара ---
  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Selected avatar file:', file);

      // Проверка типа файла (необязательно, но рекомендуется)
      if (!file.type.startsWith('image')) {
        console.error('Please select an image file.');
        // Можно показать сообщение об ошибке пользователю
        return;
      }

      // Предпросмотр с помощью FileReader
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Обновляем URL аватара для немедленного отображения превью
        this.user.avatarUrl = e.target.result;
        console.log('Avatar preview updated.');
        // ВАЖНО: Здесь нужна логика отправки `file` на ваш бэкенд
        // для сохранения и получения постоянного URL.
        // После успешной загрузки на сервер, нужно будет присвоить
        // this.user.avatarUrl = <URL_ОТ_СЕРВЕРА>;
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL для превью
    }
  }

  // --- НОВЫЙ МЕТОД: Заглушка для перехода к смене пароля ---
  navigateToChangePassword(): void {
    console.log('Navigating to change password page (implement routing)...');
    // В будущем здесь будет навигация:
    // this.router.navigate(['/profile/change-password']);
    alert('Change Password page is not implemented yet.'); // Временная заглушка
  }

  get formControls() {
    return this.profileForm.controls;
  }

}

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
