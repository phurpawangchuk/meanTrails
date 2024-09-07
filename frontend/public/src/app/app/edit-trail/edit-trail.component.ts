import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrailsService } from '../services/trails.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

type trail = {
  country: string,
  state: string,
  city: string,
  distance: string,
  name: string,
  difficulty: string,
  imageUrl: string
}
@Component({
  selector: 'app-edit-trail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trail.component.html',
  styleUrl: './edit-trail.component.css'
})
export default class EditTrailComponent implements OnInit {

  constructor(
    private _route: Router,
    private _router: ActivatedRoute, private _service: TrailsService,
    private _authentication: AuthenticationService) { }

  trailId: string = '';
  subDocId: string = '';
  country!: string;
  state!: string;
  city!: string;
  responseMessage: string = '';
  distance!: string;
  name!: string;
  difficulty!: string;
  imageUrl!: string;

  get isLoggedIn(): boolean {
    return this._authentication.hasToken;
  }

  ngOnInit(): void {
    this.trailId = this._router.snapshot.params['id'].split('-')[0];
    this.subDocId = this._router.snapshot.params['id'].split('-')[1];

    this._service.getSubTrail(this.trailId, this.subDocId).subscribe(data => {
      this.country = data.country;
      this.state = data.state;
      this.city = data.city;
      this.name = data.trails[0].name;
      this.distance = data.trails[0].distance;
      this.difficulty = data.trails[0].difficulty;
      this.imageUrl = data.trails[0].imageUrl;
    });

  }

  updateTrail(form: NgForm) {
    this._service.updateTrail(this.trailId, this.subDocId, form.value).subscribe((data) => {
      this._route.navigate(['/trails']);
    })
  }
}
