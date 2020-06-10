import { Injectable } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class IsmerchantService {
  user: firebase.User;
  userdata: any;
  uid: any;
  ismerchant: any = {};
  subscription: any;
  constructor(private auth: AuthService, private router: Router,private db: AngularFirestore) { }


  ismerchsnt()
  {
    this.auth.getUserState().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.uid = this.user["Sb"]["uid"];

        this.subscription = this.auth
          .getMerchantData(this.uid)
          .subscribe(data => {
            this.userdata = data.data();
            if (this.userdata) {
              this.ismerchant = true;
              this.IsMerchant();

            } else {
              this.auth.getUserData(this.uid).subscribe(data => {
                this.ismerchant = false;
                this.IsMerchant();

              });
            }


          });
      }
    });
  }

  IsMerchant()
  {
    return this.ismerchant;
  }
}
