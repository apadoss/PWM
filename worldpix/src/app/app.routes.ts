import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'under-construction', component:UnderConstructionComponent },
    { path: 'index', title:'test', component: IndexComponent },
    { path: '*', redirectTo: 'index' },

];
