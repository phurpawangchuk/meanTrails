import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TrailsService } from '../services/trails.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-trail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-trail.component.html',
  styleUrl: './add-trail.component.css'
})
export class AddTrailComponent {

  country!: string;
  state!: string;
  city!: string;

  responseMessage: string = '';

  distance!: string;
  name!: string;
  difficulty!: string;
  imageUrl: string = environment.defaultImageUrl;

  constructor(private _service: TrailsService,
    private _authentication: AuthenticationService) { }

  get isLoggedIn(): boolean {
    return this._authentication.hasToken;
  }

  addTrail(form: NgForm) {
    this._service.addTrail(form.value).subscribe(data => {
      console.log(data.message);
      this.responseMessage = data.message;
      this.country = '';
      this.state = '';
      this.city = '';
      this.imageUrl = '';
    })
  }
}
