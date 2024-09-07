import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../model/user';
import { Token } from '../../model/token';
import { TrailsService } from '../services/trails.service';
import e from 'express';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  textfilter: string = '';
  user: User = new User();
  message!: string;

  constructor(private _router: Router,
    private _service: TrailsService,
    private _authentication: AuthenticationService) { }

  get isLoggedIn(): boolean {
    return this._authentication.hasToken;
  }

  get name(): string {
    return this._authentication.name;
  }

  login() {
    this._service.login(this.user).subscribe({
      next: (data: Token) => {
        this._authentication.token = data;
        this.message = '';
      },
      error: (error) => {
        this.message = error.error.message;
      },
      complete: () => {
        this._router.navigate(['/trails']);
        this.user = new User();
      }
    })
  }

  logout() {
    this._authentication.logout();
    this._router.navigate(['/trails']);
  }
}
