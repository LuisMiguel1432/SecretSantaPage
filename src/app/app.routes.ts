import { Routes } from '@angular/router';
import { LoginPage } from './presentation/pages/login-page/login-page';
import { HomePage } from './presentation/pages/home-page/home-page';
import { authGuard } from './presentation/guards/auth-guard';
import { GroupPage } from './presentation/pages/group-page/group-page';
import { groupGuard } from './presentation/guards/group-guard';
import { joinGroupGuard } from './presentation/guards/join-group-guard';


export const routes: Routes = [
    {path:"login", component: LoginPage},
    {path:"", component:HomePage, canActivate: [authGuard]},
    {path:"group", component:GroupPage, canActivate:[authGuard, groupGuard]},
    {path:"group/join/:id", component:GroupPage, canActivate:[authGuard,joinGroupGuard]},
    {path:"**",component:HomePage, canActivate:[authGuard]}
];
