import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {
    name: 'Login required',
    surname: 'Login required',
    email: 'Login required',
    phone: '+77001234567',
    avatarUrl: 'assets/user-icon-1.png' 
  };

  isEditing = false;
  profileForm!: FormGroup;

 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });
    
    if (this.authService.isLocalStorageAvailable()) {
      this.http.get<any>('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }).subscribe({
        next: (userData) => {
          this.user.email = userData.email;
          this.user.name = userData.first_name;
          this.user.surname = userData.last_name;
        },
        error: (err) => {
          console.error('Failed to fetch user info', err);
        }
      });
    }
    
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

    
    this.user.name = updatedUserData.name;
    this.user.surname = updatedUserData.surname;
    this.user.email = updatedUserData.email;
    this.user.phone = updatedUserData.phone;
    
    if (this.authService.isLocalStorageAvailable()) {

      const token = localStorage.getItem('access_token');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.put('http://localhost:8000/api/profile/', {
        first_name: this.user.name,
        last_name: this.user.surname,
        email:this.user.email
      }, { headers }).subscribe({
        next: () => alert('Profile updated!'),
        error: err => alert('Failed to update profile')
      });
  }
    this.isEditing = false;
    console.log('Profile updated locally.');
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  
  logout(): void {
    console.log('Logging out...');
    // Здесь должна быть логика очистки сессии/токена
    // localStorage.removeItem('authToken'); // Пример
    // sessionStorage.removeItem('authToken'); // Пример

    // Перенаправляем на страницу входа (укажите ваш реальный путь)
    this.authService.logout()
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
