import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: 'home', title:'Home', component: HomeComponent, children: [
        { path: ':albumId', component: AlbumCardComponent}
    ] },
    { path: 'about-us', title:'About us', component: AboutUsComponent },
    { path: 'under-construction', title:'N/A', component:UnderConstructionComponent },
    { path: 'index', title:'Login', component: IndexComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: '*', redirectTo: 'index' },
    { path: 'profile', title: 'Profile', component: ProfileComponent, children: []},

];
