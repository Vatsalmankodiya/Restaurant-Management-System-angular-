import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(private foodService: FoodService,private router: Router) { }

  ngOnInit(): void {
    this.foodService.getAll().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error('Error fetching foods:', err);
      }
    });
  }
  deleteFood(id: string) {
    if (confirm('Are you sure you want to delete this food item?')) {
      this.foodService.delete(id).subscribe({
        next: () => {
          this.foods = this.foods.filter(food => food.id !== id);
          alert('Food item deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting food:', err);
          alert('Failed to delete food item.');
        }
      });
    }
  }
  editFood(id: string) {
    this.router.navigate(['/edit-food', id]);
  }
  
}
