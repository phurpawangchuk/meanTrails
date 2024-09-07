import { Component, OnInit } from '@angular/core';
import { TrailsService } from '../services/trails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trail.component.html',
  styleUrl: './trail.component.css'
})
export class TrailComponent implements OnInit {

  trail: any;
  trailId: string = '';
  subDocId: string = '';

  constructor(private _service: TrailsService,
    private _router: Router, private _activatedRoute: ActivatedRoute,
    private _authentication: AuthenticationService) { }

  get isLoggedIn(): boolean {
    return this._authentication.hasToken;
  }

  ngOnInit(): void {
    this.trailId = this._activatedRoute.snapshot.params['id'].split('-')[0];
    this.subDocId = this._activatedRoute.snapshot.params['id'].split('-')[1];

    this._service.getSubTrail(this.trailId, this.subDocId).subscribe(data => {
      this.trail = data;
    });
  }

  editTrail(id: string, subid: string) {
    this._router.navigate(['/edit-trail/', id + '-' + subid]);
  }


  deleteTrail(id: string, subDocId: string) {
    this._service.deleteTrail(id, subDocId).subscribe(data => {
      console.log(data);
      window.location.href = '/';
    });
  }
}
