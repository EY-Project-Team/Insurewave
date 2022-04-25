import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrokerComponent } from './members/broker/broker.component';
import { ClientComponent } from './members/client/client.component';
import { ContractComponent } from './members/contract/contract.component';
import { InsurerComponent } from './members/insurer/insurer.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [AuthGuard],
      },
      { path: 'client/contract', component: ContractComponent },
      { path: 'broker', component: BrokerComponent },
      { path: 'insurer', component: InsurerComponent },
    ],
  },

  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
