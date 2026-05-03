import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService extends ToastController {
  private duration = 5000;

  async showSuccess(message: string) {
    const toast = await this.create({
      message,
      duration: this.duration,
      color: 'success',
      icon: 'happy-outline',
      positionAnchor: 'tab-bar',
      swipeGesture: 'vertical',
    });

    await toast.present();
  }

  async showError(message: string) {
    const toast = await this.create({
      message,
      duration: this.duration,
      color: 'danger',
      positionAnchor: 'tab-bar',
      swipeGesture: 'vertical',
    });

    await toast.present();
  }
}
