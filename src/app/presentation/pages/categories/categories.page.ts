import { Component, OnInit, signal } from '@angular/core';

import { Category } from '@app/core/entities';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  categories = signal<Category[]>([
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' },
  ]);

  constructor() {}

  ngOnInit() {}
}
