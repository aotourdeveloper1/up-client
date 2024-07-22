import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsComponent } from './pages/us/us.component';
import { PortalsComponent } from './pages/portals/portals.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DriveWithUsComponent } from './pages/drive-with-us/drive-with-us.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import("./pages/home/home.module").then(value => value.HomeModule)
  },
  {
    path: 'us',
    component: UsComponent,
    loadChildren: () => import("./pages/us/us.module").then(value => value.UsModule)
  },
  {
    path: 'portals',
    component: PortalsComponent,
    loadChildren: () => import("./pages/portals/portals.module").then(value => value.PortalsModule)
  },
  {
    path: 'polices',
    component: PoliciesComponent,
    loadChildren: () => import("./pages/policies/policies.module").then(value => value.PoliciesModule)
  },
  {
    path: 'contact',
    component: ContactComponent,
    loadChildren: () => import("./pages/contact/contact.module").then(value => value.ContactModule)
  },
  {
    path: 'driver',
    component: DriveWithUsComponent,
    loadChildren: () => import("./pages/drive-with-us/drive-with-us.module").then(value => value.DriveWithUsModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
