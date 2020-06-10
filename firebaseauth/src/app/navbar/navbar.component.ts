import { Component, OnInit,EventEmitter,SimpleChanges, Output ,Input,OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "../auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import {IsmerchantService} from "../utils/ismerchant.service"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() valueChange = new EventEmitter();

  @Input() data;
  @Input() merchantid;
  count:any;
  user: firebase.User;
  userdata: any;
  uid: any;
  ismechant: any = {};
  subscription: any;
  filtersLoaded: Promise<boolean>;
  navbarOpen:boolean=false;
  constructor(private router: Router,public auth:AuthService, private afAuth: AngularFireAuth,
   public utilsservice: IsmerchantService) { }
  ngOnInit() {
    this.count = this.data
    this.auth.getUserState().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.uid = this.user["Sb"]["uid"];

        this.subscription = this.auth
          .getMerchantData(this.uid)
          .subscribe(data => {
            this.userdata = data.data();

            if (this.userdata) {
              this.ismechant = true;

            } else {
              this.auth.getUserData(this.uid).subscribe(data => {
                this.userdata = data.data();
                this.ismechant = false;
              });
            }
          });
      }
      else{
      
        this.router.navigateByUrl('/login')
      }
    });
 


 


 
  }


  togglenavbar()
  {
    this.navbarOpen = !this.navbarOpen
  }


  gotochat()
  {
    if(!this.ismechant){
    this.router.navigateByUrl("/mailbox")
    }
    else{
      this.router.navigateByUrl("/merchantmailbox");
    }
  }



productpage()
{
  this.router.navigateByUrl('/merchantproducts')
}




  valueChanged(serchvalue:string) { 
    // You can give any function name
    this.valueChange.emit(serchvalue);
}
ngOnChanges(changes: SimpleChanges) {
  if(changes['data']!=null){ this.count = changes['data']['currentValue']
  console.log(changes)}
 
}
gotocartpage(){
  console.log("on navbar",this.ismechant)
 console.log("shashi rourter")
 this.router.navigate(['/cartpage',this.uid ])
}

gotoshowmerchant(){
  if(this.uid){ this.router.navigateByUrl('/showmerchants')}
  else{
    this.router.navigateByUrl('/login')

  }
 
}
gotouserorderspage()
{
  if(this.ismechant){
    this.router.navigateByUrl('/orders')
  }
  else{
    this.router.navigate(['/customerorder',this.uid]);

  }
}

adddeliveryboy()
{
  if(this.ismechant){
    this.router.navigate(['/delivaryboys',this.uid])
  }
  else
  {
    this.router.navigateByUrl('/login')

  }
}

addproduct()
{
  if(this.ismechant){
    this.router.navigateByUrl('/image/upload')
  }
  else
  {
    this.router.navigateByUrl('/login')

  }
}

logout() {
  if(this.uid)
  this.auth.logout();
}
}
