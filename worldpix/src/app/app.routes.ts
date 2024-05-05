import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, children: [
        { path: ':albumId', component: AlbumCardComponent}
    ] },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'under-construction', component:UnderConstructionComponent },
    { path: 'index', title:'test', component: IndexComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: '*', redirectTo: 'index' },

];
