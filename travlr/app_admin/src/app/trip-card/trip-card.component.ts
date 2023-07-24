import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Trip } from "/Users/BTH/source/GIt Repos/travlr/app_admin/src/app/models/trips";

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(private router: Router) { }

  ngOnInit() {}

  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(["edit-trip"]);
  }

  private deleteTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(["delete-trip"]);
  }
}
