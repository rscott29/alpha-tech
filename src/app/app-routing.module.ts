import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    // data: {
    //   label: 'Dashboard'
    // },
    children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        data: {label: 'Dashboard'},
        loadChildren:  () => import('./app-pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'shopping',
       //data: {label: 'Settings'},


        loadChildren: () => import('./app-pages/shopping/settings.module').then(m => m.SettingsModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
