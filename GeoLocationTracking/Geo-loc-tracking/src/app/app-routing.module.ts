import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowlocationComponent} from "./showlocation/showlocation.component"
import {GetordersComponent} from "./getorders/getorders.component"



const routes: Routes = [
  {
    path: "map",
    component:ShowlocationComponent
  },
  {
    path: "orders/:id",
    component:GetordersComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
