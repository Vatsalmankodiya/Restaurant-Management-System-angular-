import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_tags } from 'src/data';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { FOOD_ADD_URL, FOOD_BY_ID_URL, FOOD_DELETE_URL, FOOD_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodList: Food[] = []; // Store food data locally

  constructor(private http: HttpClient) {}
    // Fetch and store the data initially

    getAll(): Observable<Food[]>{
      return this.http.get<Food[]>(FOOD_URL);
    }
    // this.http.get<Food[]>(FOOD_URL).subscribe(data => {
    //   this.foodList = data;
    // });
  

  // getAll(): Food[] {
  //   return this.foodList; // Return stored data synchronously
  // }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  // getAllFoodByTag(tag: string): Food[] {
  //   console.log("Filtering foods with tag:", tag);

  //   if (tag === "All") {
  //     return this.getAll();
  //   }

  //   return this.getAll().filter(food =>
  //     food.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  //   );
  // }

  getFoodById(foodId: string): Observable<Food> {
    const url = `${FOOD_BY_ID_URL}/${foodId}`;
    console.log('Fetching food by ID:', url); // Debugging URL
    return this.http.get<Food>(url);
  }
  addFood(food: Partial<Food>): Observable<Food>
{
    return this.http.post<Food>(FOOD_ADD_URL, food);
  }
  delete(id: string) {
    return this.http.delete(`${FOOD_DELETE_URL}/${id}`);
  }
  getById(id: string) {
    return this.http.get<Food>(`http://localhost:5000/api/foods/${id}`);
  }
  
  update(food: Food) {
    return this.http.put(`http://localhost:5000/api/foods/update/${food.id}`, food);
  }
  
  
}





// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // ✅ Correct Import
// import { Observable } from 'rxjs';
// import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
// import { Food } from '../shared/models/Food';
// import { Tag } from '../shared/models/Tag';

// @Injectable({
//   providedIn: 'root'
// })
// export class FoodService {

//   constructor(private http: HttpClient) { } // ✅ Correct injection

//   getAll(): Observable<Food[]> {
//     return this.http.get<Food[]>(FOOD_URL);
//   }

//   // getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
//   //   return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
//   // }

//   // getAllTags(): Observable<Tag[]> {
//   //   return this.http.get<Tag[]>(FOODS_TAGS_URL);
//   // }

//   // getAllFoodsByTag(tag: string): Observable<Food[]> {
//   //   return tag === "All" ? this.getAll() : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
//   // }

//   getFoodById(foodId: string): Observable<Food> {
//     return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
//   }
// }
