//this gets executed first


//for typescript stuff
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//angular function that starts the angular framework.
platformBrowserDynamic().bootstrapModule(AppModule) //bootstrap module fn "AppModule", is the module that gets started on bootup
  .catch(err => console.error(err));
