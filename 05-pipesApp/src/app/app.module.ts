import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

// Configuración del locale de la app
import localeEsCo  from "@angular/common/locales/es-CO";
import localeEsFrCa  from "@angular/common/locales/fr-CA";
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeEsCo)
registerLocaleData(localeEsFrCa)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    {provide: LOCALE_ID, useValue: 'es-CO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
