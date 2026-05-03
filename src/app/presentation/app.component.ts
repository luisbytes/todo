import { Component, inject, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { DatabaseService } from '@app/core/services/database.service';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private platform = inject(Platform);
  private database = inject(DatabaseService);
  private splashScreen = inject(SplashScreen);

  async ngOnInit(): Promise<void> {
    await this.platform.ready();

    this.splashScreen.hide();

    try {
      await this.database.initialize();
    } catch (error) {
      console.error('Failed to initialize database', error);
    }
  }
}
