import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Landingpage } from './app/landingpage/landingpage';

bootstrapApplication(Landingpage, appConfig)
  .catch((err) => console.error(err));
