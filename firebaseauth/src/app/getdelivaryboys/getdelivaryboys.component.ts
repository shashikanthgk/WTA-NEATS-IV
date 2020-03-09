import { Component, OnInit,OnChanges,SimpleChanges } from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs/internal/Observable";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {AdddelivaryboyComponent} from "../adddelivaryboy/adddelivaryboy.component"
@Component({
  selector: 'app-getdelivaryboys',
  templateUrl: './getdelivaryboys.component.html',
  styleUrls: ['./getdelivaryboys.component.css']
})
export class GetdelivaryboysComponent implements OnInit,OnChanges {
  name:string;
  phone:string;
  delivaryboys:any = [];
 merid :any;
  constructor(private routeractivated: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,

    private db: AngularFirestore,public dialog: MatDialog) { 
    
    }

  ngOnInit() {
    this.merid =  this.routeractivated.snapshot.paramMap.get('merid');
    console.log("olduser", this.merid);
      this.db
      .collection("Delivaryboys", ref => ref.where("merchantid", "==", this.merid))
      .get()
      .subscribe(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          var x = {
            name:doc.data()['name'],
            phone:doc.data()['phone'],
            id:doc.id
          }
        this.delivaryboys.push(x)
        });
        console.log(this.delivaryboys)
    });
    
   
}



  ngOnChanges(changes: SimpleChanges){
    console.log("this is called",changes)

 
  }

adddelivaryboys(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
   merchantid:this.merid
};
const dialogRef= this.dialog.open(AdddelivaryboyComponent, dialogConfig);
dialogRef.afterClosed().subscribe(data=>{
  console.log(data)
  var x ={
    name:data['name'],
    phone:data['phone'],
    id:data['id']
  }
  this.delivaryboys.push(x);
})
}


}
