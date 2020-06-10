import { Component, OnInit,OnDestroy } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-showlocation',
  templateUrl: './showlocation.component.html',
  styleUrls: ['./showlocation.component.css']
})
export class ShowlocationComponent implements OnInit,OnDestroy {
  isTracking:boolean=false
  latc:number;
  lngc:number;
  watchid:any;
  id:any;
  target:any;
  options:any;
  _db:any;
itemDoc:any;
formdata:any;
temp :any;
temDoc:any;
dboyid:any = null;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private fire: AngularFirestore) {
    // this.afAuth.signInAnonymously();
    this._db = db;
  }  





  ngOnInit(): void {


    this.formdata = new FormGroup({
      userid: new FormControl("",
         Validators.required,
        ),
   });



    
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

  }



 async onClickSubmit(data) {
   this.dboyid = data.userid;
    // let utemp =await this.fire.doc(`/Delivaryboys/${data.userid}`)
        this.itemDoc =await this.fire.collection('/Delivaryboys').doc(data.userid)
  

      this.temp = data.userid
      console.log("shashi ",this.temp);
      this.isTracking  = true;
      this.id   =  navigator.geolocation.watchPosition(pos=>{
        const crd = pos.coords;
        this.latc = crd.latitude
        this.lngc = crd.longitude
  
        if(this.isTracking){
         this.setLocation2(this.temp,this.latc,this.lngc).then(res=>{
          console.log("res",res);
          }).then(err=>{
          console.log("err",err)
          });
  
        }
  
  
       }, err=>{
        console.warn('ERROR(' + err.code + '): ' + err.message);
    
       }, this.options);
      
    
  
}




  stop()
  {
    this.isTracking = false;
    navigator.geolocation.clearWatch( this.id ); 

  }

onKey(event)
{
this.temp = event.target.value
}

  ngOnDestroy()
  {
    this.isTracking = false;
    navigator.geolocation.clearWatch( this.id ); 
  }

setLocation(userid,lattitude,longitude) {
    console.log("called",userid)
      return this.db.object(`Delivaryboys/${this.temp}`).update({ lattitude:lattitude, longitude: longitude });
    
  }

  setLocation2(userid,lattitude,longitude) {
    console.log("called",userid)
      return this.itemDoc.update({ lattitude:lattitude, longitude: longitude })
    
  }

}
