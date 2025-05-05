import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PredictionComponent } from './prediction/prediction.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { PredictionEnergyComponent } from './prediction-energy/prediction-energy.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'prediction', component: PredictionComponent, canActivate: [AuthGuard] },
  { path: 'suggestion', component: SuggestionComponent, canActivate: [AuthGuard] },
  { path: 'prediction_energy', component: PredictionEnergyComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
