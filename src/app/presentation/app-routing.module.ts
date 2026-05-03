import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'add-todo',
    loadChildren: () => import('./pages/add-todo/add-todo.module').then((m) => m.AddTodoPageModule),
  },
  {
    path: 'category-form/:id',
    loadChildren: () => import('./pages/category-form/category-form.module').then((m) => m.CategoryFormPageModule),
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
