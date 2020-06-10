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
import {DeliveryboyserviceService} from "../dservice/deliveryboyservice.service"
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment";

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
    private dser :DeliveryboyserviceService
    ,private httpClient: HttpClient,
    public snackBar: MatSnackBar
,
    private db: AngularFirestore,public dialog: MatDialog,) { 
    
    }

  ngOnInit() {
    this.merid =  this.routeractivated.snapshot.paramMap.get('merid');
    console.log("olduser", this.merid);
      this.db
      .collection("Delivaryboys", ref => ref.where("merchantid", "==", this.merid))
      .valueChanges({idField: 'id'})
      .subscribe(snapshot => {
        this.delivaryboys = []
        if (!snapshot) {
          console.log("No matching documents.");
          return;
        }
        console.log("snapshot",snapshot)
        snapshot.forEach(doc => {
          var x = {
            name:doc['name'],
            phone:doc['phone'],
            id:doc['id'],
            email:doc['email']
          }
        this.delivaryboys.push(x)
        });
        console.log(this.delivaryboys)
    });
    
 this.checkupdates();  
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
  console.log("data from dboy",data)
  var x ={
    name:data['name'],
    phone:data['phone'],
    id:data['id'],
    email:data['email']
  }
  let url = 'http://localhost:3000/sendmail'
  let info = `<h3>Congrats!!</h3><p> Your assigned as a delivery boy for the project N-EATS-NC-APP and your userid is <strong>${x['id']}</strong>.Use this id for logging into the location tracking app</p><br><h3>Thank you!</h3>`
  let  post = {email:x['email'],subject:"Regarding N-Eats delivery service",info:info,token:environment.token};
  //send email notification to the d boy;
  console.log("post data ",post)

  this.sendemail(url, post).subscribe((val) => {
    console.log("POST call successful value returned in body", 
                val);
                this.openSnackBar("Email sent ","success");
    },
response => {
    console.log("POST call in error", response);
    this.openSnackBar("Email not sent ","try again");
   this.db.collection('/Delivaryboys').doc(x['id']).delete().then(res=>{
     console.log("deleted ",res);
   }).catch(err=>{
     console.log("error ",err);
   })
            },
() => {
    console.log("The POST observable is now completed.");
      });



  // this.delivaryboys.push(x);
})
}
checkupdates()
{
  let x = this.db.collection('/Delivaryboys').valueChanges().subscribe((userData) => {
    // put your logic here
    // console.log(userData);
});



}


delete(index)
{
console.log(index,this.delivaryboys[index])
this.dser.deletedboy(this.delivaryboys[index].id);
this.delivaryboys = this.delivaryboys.filter(item => item.id !== this.delivaryboys[index].id);
console.log("new ",this.delivaryboys);
}



sendemail(url,post)
{
  return this.httpClient.post<any>(url, post);
}

openSnackBar(message,success) {
  this.snackBar
  .open(message,success , {
    duration: 2000,
  });
}
}
