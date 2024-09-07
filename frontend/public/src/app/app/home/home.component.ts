import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Token } from '../../model/token';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _authentication: AuthenticationService, private _router: ActivatedRoute) {
    const token = _router.snapshot.queryParams['token'];
    _authentication.token = new Token(token);
  }
}
