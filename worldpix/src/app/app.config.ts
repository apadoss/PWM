import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const enviroment = {
  "projectId":"worldpix-database",
  "appId":"1:848991872822:web:3087dc2049c7e65090f597",
  "storageBucket":"worldpix-database.appspot.com",
  "apiKey":"AIzaSyCDFU3iBucv7JoO9d-deYdXwGGMBHWoa4A",
  "authDomain":"worldpix-database.firebaseapp.com",
  "messagingSenderId":"848991872822"
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(enviroment))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideAnalytics(() => getAnalytics())), 
    ScreenTrackingService, 
    UserTrackingService, 
    //importProvidersFrom(provideAppCheck(() => {
  // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
    //const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
    //return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    //})), 
    importProvidersFrom(provideFirestore(() => getFirestore())), 
    importProvidersFrom(provideDatabase(() => getDatabase())), 
    importProvidersFrom(provideFunctions(() => getFunctions())), 
    importProvidersFrom(provideMessaging(() => getMessaging())), 
    importProvidersFrom(providePerformance(() => getPerformance())), 
    importProvidersFrom(provideStorage(() => getStorage())), 
    importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()]
};
