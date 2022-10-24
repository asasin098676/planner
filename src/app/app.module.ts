import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyDK1vKBUJ6YwyEmIF4jXi1tfvkklUKm64w',
  authDomain: 'romanprogect.firebaseapp.com',
  projectId: 'romanprogect',
  storageBucket: 'romanprogect.appspot.com',
  messagingSenderId: '775166761013',
  appId: '1:775166761013:web:090dc3d5729929728a797c',
  measurementId: 'G-VVTNPQXCWS',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSliderModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
