import { Component, computed, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
  standalone: false,
})
export class CategoryFormPage implements OnInit {
  id = input<number>();

  isNew = computed(() => this.id() === 0 || this.id() === undefined);

  title = computed(() => (this.isNew() ? 'Crear Categoría' : 'Editar Categoría'));

  constructor() {}

  ngOnInit() {}
}
