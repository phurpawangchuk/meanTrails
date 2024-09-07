import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TrailsService } from '../services/trails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: User = new User();

  isLoggedIn: boolean = false;
  constructor(private _service: TrailsService,
    private _authentication: AuthenticationService,
    private _router: Router,
    private _activeRouter: Router) { }

  login() {
    this._service.login(this.user).subscribe({
      next: (data) => {
        this._authentication.token = data;
      },
      error: () => {

      },
      complete: () => {
        this._router.navigate(['/trails']);
      }
    })
  }

  // login(form: NgForm) {
  //   this._service.login(form.value).subscribe(data => {
  //     this._authService.setToken(data.message);
  //     this._activeRouter.navigate(['/trails'], { state: { animation: 'TrailsPage' } });
  //   })
  // }
}