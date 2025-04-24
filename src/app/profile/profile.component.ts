// Импорты: Добавляем Router
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    avatarUrl: 'assets/user-icon-1.png' 
  };

  isEditing = false;
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router 
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

    this.user.name = updatedUserData.name;
    this.user.surname = updatedUserData.surname;
    this.user.email = updatedUserData.email;
    this.user.phone = updatedUserData.phone;

    this.isEditing = false;
    console.log('Profile updated locally.');
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  logout(): void {
    console.log('Logging out...');
    this.router.navigate(['/log-in']);
  }
  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Selected avatar file:', file);
      if (!file.type.startsWith('image')) {
        console.error('Please select an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatarUrl = e.target.result;
        console.log('Avatar preview updated.');

      };
      reader.readAsDataURL(file); 
    }
  }

  navigateToChangePassword(): void {
    console.log('Navigating to change password page (implement routing)...');
    alert('Change Password page is not implemented yet.'); 
  }

  get formControls() {
    return this.profileForm.controls;
  }

}

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
