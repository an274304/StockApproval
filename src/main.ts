import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LogInComponent } from './app/shared/components/log-in/log-in.component';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
