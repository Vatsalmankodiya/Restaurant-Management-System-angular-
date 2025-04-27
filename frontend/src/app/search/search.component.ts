import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  foods: Food[] = [];
  filteredFoods: Food[] = [];
  selectedTag: string = 'All';

  sample_tags: Tag[] = [
    { name: 'All', count: 9 },
    { name: 'FastFood', count: 9 },
    { name: 'Pizza', count: 3 },
    { name: 'burger', count: 3 },
    { name: 'Fries', count: 1 },
    { name: 'pasta', count: 2 },
  ];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getAll().subscribe({
      next: (foods) => {
        this.foods = foods;
        this.applyFilters(); // show all initially
      },
      error: (err) => {
        console.error("Error fetching foods:", err);
      }
    });
  }

  search(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.foods;

    // Apply search term filter
    if (this.searchTerm) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply tag filter
    if (this.selectedTag !== 'All') {
      filtered = filtered.filter(food =>
        food.tags?.some(t => t.toLowerCase() === this.selectedTag.toLowerCase())
      );
    }

    this.filteredFoods = filtered;
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.applyFilters();
  }
}

