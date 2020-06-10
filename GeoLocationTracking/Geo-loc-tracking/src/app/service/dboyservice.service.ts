import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import {order} from "../getorders/order.interface"
// import { Observable, forkJoin } from 'rxjs'
import 'rxjs/Rx';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DboyserviceService {
 orders: Array<order>;    

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }


  updateorder(oid)
  {
   return this.db.collection('Orders').doc(`/${oid}`).update({status:'Approved'})
  }

  getorders(dboyid)
  {
    return this.db.collection('Delivaryboys').doc(`/${dboyid}`).valueChanges()
  }

   getcidbyoid(oid)
  {
      return this.db.collection('Orders').doc(`/${oid}`).valueChanges()
  }
  getnamebycid(cid)
  {
    return this.db.collection('Users').doc(`/${cid}`).valueChanges()
  }

  // getorderwithdetails(dboyid)
  // {
  //   return this.getorders(dboyid).map((res: Response)=>res['orders'])
  //   .flatMap(res=>  Observable.forkJoin(
  //     res.map((order$:any)=>{
      
  //       let m =  this.getcidbyoid(order$)
  //       .map((res:any)=>res['userid'])
  //       .flatMap(custid=> 

          
  //               this.getnamebycid(custid).map((res:any)=>{
  //             let name = res['firstname']+res['lastname'];
  //             var x  = {
  //               name:name,
  //               order:order$
  //             }
  //             return  x;
  //           })  
  //       )
  //       return m;    
  //     }

  //   ))
  
  //   )
      
  // }


updatedetails(status,oid)
{
  return this.db.collection('Orders').doc(`/${oid}`).update({status:status})
}



}







