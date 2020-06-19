import { Component, OnInit,Input } from '@angular/core';
import {DboyserviceService} from "../service/dboyservice.service"
import {ActivatedRoute,Router} from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { async } from '@angular/core/testing';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-getorders',
  templateUrl: './getorders.component.html',
  styleUrls: ['./getorders.component.css']
})
export class GetordersComponent implements OnInit {
   order = new Array();
   prom = new Array();
   data = new Array();
  constructor(private db: AngularFirestore,private routeractivated: ActivatedRoute,public dboyser: DboyserviceService) { }
@Input() dboyid
  ngOnInit() {
    console.log("dboyid",this.dboyid);
    this.prom = []
  let p2  =  new Promise((resolve2,reject2)=>{
    this.getorders(this.dboyid).subscribe((data:any)=>{
      console.log(data);
      this.prom = []
      data['orders'].forEach(oid => {
      
       let p1 =  this.getcidbyoid(oid).subscribe(cid=>{
         console.log(cid);
          if(cid['status']=='order assigned'){
          let x =   new Promise((resolve,reject)=>
            {
               this.getnamebycid(cid['userid']).subscribe(data=>{
                var x = {
                  name : data['firstname']+data['lastname'],
                  oid :oid
                }
                console.log(x);
                 resolve(x)
                 
               })
            })
          
            x.then(data=>{
              console.log(data)
              this.prom.push(data);
            })
          }
        })
      });

    }  
     
    )
   }) 

 p2.then(data=>{
   console.log(data);
 })
    



}


getorders(dboyid)
{

  return this.db.collection('Delivaryboys').doc(`/${dboyid}`).valueChanges().pipe(take(1))
}

 getcidbyoid(oid)
{
    return this.db.collection('Orders').doc(`/${oid}`).valueChanges().pipe(take(1))
}
getnamebycid(cid)
{
  return this.db.collection('Users').doc(`/${cid}`).valueChanges().pipe(take(1))
}
update(index)
{
  this.dboyser.updatedetails("Delivered",this.prom[index]['oid'],).then(data=>{
    console.log(data)
    this.prom.splice(index, 1);

  }).catch(err=>{
    console.log(err);
  })
}
}
