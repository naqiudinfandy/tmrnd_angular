import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'detail/:id', component: DetailComponent }
];