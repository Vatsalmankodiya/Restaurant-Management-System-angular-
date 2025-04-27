import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
  styleUrls: ['./admin-head.component.css']
})
export class AdminHeadComponent implements OnInit {
  currentTime: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // update every second
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  goToAddFood() {
    this.router.navigate(['/add-food']);
  }
  gotoorder() {
    this.router.navigate(['/admin-order']);
  }
  gotobooking() {
    this.router.navigate(['/admin-booking']);
  }
  goHome() {
    this.router.navigate(['/']);
  }
  adminHome() {
    this.router.navigate(['/adminhome']);
  }
}