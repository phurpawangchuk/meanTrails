import { Component, OnInit } from '@angular/core';
import { TrailsService } from '../services/trails.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trails',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './trails.component.html',
  styleUrl: './trails.component.css'
})
export class TrailsComponent implements OnInit {

  trails: any[] = [];
  offset: number = environment.offset;
  perPage: number = environment.perPage;
  count: number = environment.count;
  total: number = 0;
  searchTerm: string = '';
  searchMessage: string = '';

  constructor(private _service: TrailsService, private _router: Router, private _authentication: AuthenticationService) { }

  get isLoggedIn(): boolean {
    return this._authentication.hasToken;
  }

  ngOnInit(): void {

    this._service.getAllTrails(this.offset, this.count, this.searchTerm).subscribe(data => {
      this.trails = data;
    });

    this._service.getTrailsCount().subscribe(data => {
      this.total = data;
    });

  }

  filterTrail() {
    this._service.getFilterTrails(this.searchTerm).subscribe(data => {
      if (data.length === 0) {
        this.searchMessage = 'No trails found with that search term: ' + this.searchTerm;
      }
      this.trails = data;
    });
  }

  next() {
    this.offset += this.perPage;
    this.count = this.offset + this.perPage;
    this._service.getAllTrails(this.offset, this.count, this.searchTerm).subscribe(data => {
      this.trails = data;
    });
  }

  previous() {
    if (this.offset > 0) {
      this.offset -= this.perPage;
    } else {
      this.offset = 0;
    }
    this.count -= this.perPage;
    this._service.getAllTrails(this.offset, this.count, this.searchTerm).subscribe(data => {
      this.trails = data;
    });
  }
}
