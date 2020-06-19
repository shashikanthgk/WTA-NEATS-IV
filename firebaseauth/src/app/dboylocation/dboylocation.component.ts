import { Component, OnInit,EventEmitter,SimpleChanges, Output ,Input,OnChanges,OnDestroy } from '@angular/core';
import  {DeliveryboyserviceService} from '../dservice/deliveryboyservice.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dboylocation',
  templateUrl: './dboylocation.component.html',
  styleUrls: ['./dboylocation.component.css']
})


export class DboylocationComponent implements OnInit,OnDestroy {
  @Input() orderboyid;
  public iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  constructor(public dser:DeliveryboyserviceService) { }

  zoom = 9;
  latc: number = 51.678418;
  lngc: number = 7.809007;

  latd: number = 56.678418;
  lngd: number = 87.809007;



  username:any;
  ngOnInit() {
    this.getUserLocation();
    console.log("orderboy idddddddddd",this.orderboyid);
    let doc = this.dser.getdlocation(this.orderboyid);
    let observer = doc.valueChanges().subscribe(data=>
    {
        console.log("data ",data)
        if(data){
        this.latd = data['lattitude']
        this.lngd = data['longitude']
        this.username = data['name']
        }
        else{
          console.log("Order boy not found")
        }
        
    })

  }
  watchid:any;



  getUserLocation()
  {
    if(navigator.geolocation)
    {
     this.watchid =  navigator.geolocation.watchPosition(position=>{
        console.log("watch position")

        this.latc = position.coords.latitude
        this.lngc = position.coords.longitude
        console.log("lattiri",this.latc,this.lngc)
      })
    }
    else
    {
      console.log("geo location not found")
      this.latc = 12.9951;
      this.lngc = 74.8094;
    }
  }

ngOnDestroy()
{
  navigator.geolocation.clearWatch( this.watchid ); 
}
  

}
