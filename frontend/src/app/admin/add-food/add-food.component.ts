import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from 'src/app/shared/models/food';
import { FOOD_ADD_URL } from 'src/app/shared/constants/urls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
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

  originsInput: string = '';
  availableTags: string[] = ['FastFood', 'Pizza', 'Burger', 'Fries', 'Pasta'];

  constructor(private http: HttpClient, private router: Router) {}

  onTagChange(event: any) {
    const tag = event.target.value;
    if (event.target.checked) {
      if (!this.food.tags!.includes(tag)) {
        this.food.tags!.push(tag);
      }
    } else {
      this.food.tags = this.food.tags!.filter(t => t !== tag);
    }
  }
  

  onSubmit() {
    this.food.origins = this.originsInput
      .split(',')
      .map(origin => origin.trim())
      .filter(origin => origin !== '');
  
    this.http.post(FOOD_ADD_URL, this.food).subscribe({
      next: res => {
        alert('Food added successfully!');
        this.router.navigate(['/adminhome']); // 🔁 change to your route
      },
      error: err => alert('Error adding food: ' + err.message)
    });
  }
  
}
