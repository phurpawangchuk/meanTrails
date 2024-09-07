import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { TrailsComponent } from './app/trails/trails.component';
import { TrailComponent } from './app/trail/trail.component';
import { RegisterComponent } from './app/register/register.component';
import { LoginComponent } from './app/login/login.component';
import { AddTrailComponent } from './app/add-trail/add-trail.component';
import EditTrailComponent from './app/edit-trail/edit-trail.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/trails', pathMatch: 'full'
    },
    {
        path: 'trails', component: TrailsComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'trail/:id', component: TrailComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'add-trail', component: AddTrailComponent
    },
    {
        path: 'edit-trail/:id', component: EditTrailComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'success', component: TrailsComponent
    },

    {
        path: '**', redirectTo: '/trails'
    }
];
