import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      

      {
        path: 'pain',
        loadChildren: () => import('../pain/pain.module').then( m => m.PainPageModule),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'sintomas',
      //   loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      // },
      {
        path: 'symptoms',
        loadChildren: () => import('../symptoms/symptoms.module').then( m => m.SymptomsPageModule),
        canActivate: [AuthGuard]
      },
      


      // {
      //   path: 'medicamentos',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },

      {
        path: 'medicament',
        loadChildren: () => import('../medicament/medicament.module').then( m => m.MedicamentPageModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'options',
        loadChildren: () => import('../options/options.module').then( m => m.OptionsPageModule)
      },


      {
        // path: '',
        // redirectTo: '/tabs/pain',
        // pathMatch: 'full'
      }
    ]
  },
  { //ALTERAR TELA INICIAL DO APP
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
