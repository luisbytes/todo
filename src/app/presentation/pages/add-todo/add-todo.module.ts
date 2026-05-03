import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTodoPageRoutingModule } from './add-todo-routing.module';
import { AddTodoPage } from './add-todo.page';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, AddTodoPageRoutingModule],
  declarations: [AddTodoPage],
})
export class AddTodoPageModule {}
