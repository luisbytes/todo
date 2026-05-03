import { Component, computed, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
  standalone: false,
})
export class CategoryFormPage implements OnInit {
  id = input<string>();

  isNew = computed(() => this.id() === 'new');

  title = computed(() => (this.isNew() ? 'Create Category' : 'Edit Category'));

  constructor() {}

  ngOnInit() {}
}
