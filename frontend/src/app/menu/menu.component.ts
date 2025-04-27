import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';
import { FoodService } from '../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';
// import { User } from '../shared/models/User'; // adjust path as needed

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foods: Food[] = [];
  filteredFoods: Food[] = [];
  sample_tags: Tag[] = [
    { name: 'All', count: 9 },
    { name: 'FastFood', count: 9 },
    { name: 'Pizza', count: 3 },
    { name: 'burger', count: 3 },
    { name: 'Fries', count: 1 },
    { name: 'pasta', count: 2 },
  ];

  selectedTag: string = 'All';
  currentUser!: User;

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user from user service
    this.currentUser = this.userService.currentUser;

    this.foodService.getAll().subscribe({
      next: (foods) => {
        this.foods = foods;
        this.filteredFoods = foods;
      },
      error: (err) => {
        console.error("Error fetching foods:", err);
      }
    });
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;

    if (tag === "All") {
      this.filteredFoods = this.foods;
    } else {
      this.filteredFoods = this.foods.filter(food =>
        food.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    console.log("Filtered Foods:", this.filteredFoods);
  }

  gotoadmin() {
    this.router.navigate(['/adminhome']); // Change this route as needed
  }

}
