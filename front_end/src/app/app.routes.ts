import { Routes,RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UserlistComponent } from './componants/userlist/userlist.component';
import { WorkComponent } from './componants/work/work.component';
import { WorkHistoreComponent } from './componants/work-histore/work-histore.component';
import { FileTypeComponent } from './componants/file-type/file-type.component';
import { AcceuilComponent } from './componants/acceuil/acceuil.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        
      },
    {
        path: 'home',
        component: LayoutComponent,
        canActivate: [authGuard],

       children: [
      { path: '', component: AcceuilComponent },

      { path: 'userlist', component: UserlistComponent },
      {path:"work",component:WorkComponent},
      {path:"workhistorie",component:WorkHistoreComponent},
      {path:"file_type",component:FileTypeComponent},

    ]
        
      },
     
      { path: '**', redirectTo: '' }
];
