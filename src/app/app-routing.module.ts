import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignOutComponent } from './auth/sign-out/sign-out.component';
import { AuthGuard } from './auth/Gaurd/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:"/auth/signin",
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'inbox',
    canLoad:[AuthGuard],
    loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
