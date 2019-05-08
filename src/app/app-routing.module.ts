import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from  './home/home.component';
import { InventoryComponent } from  './inventory/inventory.component';
import { SignupComponent } from  './signup/signup.component';
import { PopupComponent } from  './popup/popup.component';

const  routes:  Routes  = [
  {
    path:  '',
    component:  HomeComponent
  },
  {
    path:  'inventory',
    component:  InventoryComponent
  },
  {
    path:  'signup',
    component:  SignupComponent
  },
  {
    path:  'popup',
    component:  PopupComponent
  },
  
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
