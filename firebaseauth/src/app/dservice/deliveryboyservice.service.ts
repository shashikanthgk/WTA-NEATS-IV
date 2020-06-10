import { Injectable } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class DeliveryboyserviceService {

  constructor(private auth: AuthService, private router: Router,private db: AngularFirestore) {

   }
deletedboy(id)
{
  this.db
  .doc(`/Delivaryboys/${id}`)
  .get()
  .subscribe(function(doc) {
    doc.ref.delete().catch(err => {
      if(err){
        this.openSnackBar("😫😫😫😫😫😫","Delivery boy deleted")
      }
      else{
        this.openSnackBar("😨😨😨😨😨😨","delivery boy can't be deleted")
      }
      console.log("document can not be deleted ");
    });
  });
}

 getdlocation(id)
{
 return this.db.collection('/Delivaryboys').doc(id);
}
}
