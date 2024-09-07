import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms'
import { TrailsService } from '../services/trails.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  info: any;

  constructor(private _service: TrailsService, private _authentication: AuthenticationService,) { }

  get isLoggedIn(): boolean {
    return this._authentication.hasToken;
  }

  user: User = new User();

  actionMessages: string = "";
  displayError: boolean = false;

  registerUser() {
    this._service.register(this.user).subscribe(
      {
        next: (user) => {
          this.displayError = false;
          this.actionMessages = "Registration successful";
        },
        error: (error) => {
          this.displayError = true;
          this.actionMessages = "Error: User already exist.";
        },
        complete: () => {
          console.log("Registration successful");
        }
      }
    );
  }
}
