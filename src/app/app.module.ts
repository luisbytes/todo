import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { CategoryRepository, TodoRepository } from './core/repositories';
import { CategorySqliteRepository } from './data/repositories/category-sqlite.repository';
import { TodoSqliteRepository } from './data/repositories/todo-sqlite.repository';
import { AppRoutingModule } from './presentation/app-routing.module';
import { AppComponent } from './presentation/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    SQLite,
    SplashScreen,
    { provide: TodoRepository, useClass: TodoSqliteRepository },
    { provide: CategoryRepository, useClass: CategorySqliteRepository },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
