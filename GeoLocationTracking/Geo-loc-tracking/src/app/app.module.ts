import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowlocationComponent } from './showlocation/showlocation.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {  MatButtonModule } from '@angular/material/button';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {AgmCoreModule} from '@agm/core';
import { GetordersComponent } from './getorders/getorders.component';
var config: {
  apiKey: "AIzaSyANoCwI8BuLyqS-AW3BqGQmpSjaAIHFsMk",
  authDomain: "fir-authentication-3fba3.firebaseapp.com",
  databaseURL: "https://fir-authentication-3fba3.firebaseio.com",
  projectId: "fir-authentication-3fba3",
  storageBucket: "fir-authentication-3fba3.appspot.com",
  messagingSenderId: "137801154719",
  appId: "1:137801154719:web:898a36e397284823d562aa",
  measurementId: "G-2F1G05YJCM"
}
var agmapi:"AIzaSyA2KFalX3_Eapr_OgMKuoL12362hAiLRWs"



@NgModule({
  declarations: [
    AppComponent,
    ShowlocationComponent,
    GetordersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyANoCwI8BuLyqS-AW3BqGQmpSjaAIHFsMk",
      authDomain: "fir-authentication-3fba3.firebaseapp.com",
      databaseURL: "https://fir-authentication-3fba3.firebaseio.com",
      projectId: "fir-authentication-3fba3",
      storageBucket: "fir-authentication-3fba3.appspot.com",
      messagingSenderId: "137801154719",
      appId: "1:137801154719:web:898a36e397284823d562aa",
      measurementId: "G-2F1G05YJCM"
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
       AgmCoreModule.forRoot({
      apiKey:agmapi
    }),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularFireDatabaseModule,
    MatCardModule,
    MatDialogModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
