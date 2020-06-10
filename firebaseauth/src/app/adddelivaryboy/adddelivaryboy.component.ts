import { Component, OnInit ,ViewChild, ElementRef,AfterViewChecked,Input,Inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-adddelivaryboy',
  templateUrl: './adddelivaryboy.component.html',
  styleUrls: ['./adddelivaryboy.component.css']
})
export class AdddelivaryboyComponent implements OnInit {
  form: FormGroup;
  name:string;
  phone:any;
  merchantid:any;
 orders:any=[]
 status:any=[]
 invalidname:boolean=false;
 invalidphone:boolean=false;
 invalidemail:boolean=false;
  constructor(public fb: FormBuilder,private routeractivated: ActivatedRoute,private router: Router, private db: AngularFirestore, public dialogRef: MatDialogRef<AdddelivaryboyComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.merchantid = data['merchantid']
      console.log("data",data)}

  ngOnInit() {

    this.form = this.fb.group({
      name:["", [Validators.required]],
      phone:["", [Validators.required]],
      email:["", [Validators.required]] 
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  oninvalidname(name){
    var nameo = /^\s*$/
  if(name.match(nameo)){
    this.invalidname = true;
  }
  else{
    this.invalidname =false;
  }
  }


  oninvalidphone(phone){
    var phoneno = /^\d{10}$/;
    if(phone.match(phoneno)){
    this.invalidphone = false;
}
    else{
    this.invalidphone = true;

}
}
oninvalidemail(email){
  var emailp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if(email.match(emailp)){
  this.invalidemail = false;
}
  else{
  this.invalidemail = true;

}
}

  save() {
    let orderboyid;
    console.log(this.form.value)
    var phoneno = /^\d{10}$/;
    var nameo = /^\s*$/
    var email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if(!this.form.value['name'].match(nameo) &&  this.form.value['phone'].match(phoneno) && this.form.value['email'].match(email)){
      this.db.collection(`Delivaryboys/`).add({
        name:this.form.value['name'],
        merchantid:this.merchantid,
        orders:this.orders,
        lattitude:0,
        longitude:0,
        phone:this.form.value['phone'],
        email:this.form.value['email'],
        status:this.status,
    
      }).then(res=>{
        
        console.log("delivary boy added sucess fully", res["id"]);

        var sendback = {
          name:this.form.value['name'],
          id:res['id'],
          phone:this.form.value['phone'],
          email:this.form.value['email']
        }
        this.dialogRef.close(sendback);

      }).catch(err=>{
        console.log("errores", err);
        this.dialogRef.close("failed");

      })
  

  
    }


 
}

    close() {
  this.dialogRef.close();
}
}
