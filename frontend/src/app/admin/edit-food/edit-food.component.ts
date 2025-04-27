import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {
  food: Food = {
    id: '',
    name: '',
    discription: '',
    price: 0,
    imageUrl: '',
    stars: 1,
    favorite: false,
    tags: [],
    origins: [],
    cookTime: ''
  };

  originsInput = '';
  availableTags = ['FastFood', 'Pizza', 'Burger', 'Fries', 'Pasta'];

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.foodService.getById(id).subscribe({
        next: (res) => {
          this.food = res;
          this.originsInput = res.origins.join(', ');
        },
        error: (err) => alert('Failed to load food')
      });
    }
  }

  onTagChange(event: any) {
    const tag = event.target.value;
  
    // Ensure tags is initialized
    if (!this.food.tags) {
      this.food.tags = [];
    }
  
    if (event.target.checked) {
      if (!this.food.tags.includes(tag)) {
        this.food.tags.push(tag);
      }
    } else {
      this.food.tags = this.food.tags.filter(t => t !== tag);
    }
  }
  

  onSubmit() {
    this.food.origins = this.originsInput
      .split(',')
      .map(o => o.trim())
      .filter(o => o !== '');

    this.foodService.update(this.food).subscribe({
      next: () => {
        alert('Food updated successfully!');
        this.router.navigate(['/adminhome']);
      },
      error: (err) => alert('Failed to update food: ' + err.message)
    });
  }
}
