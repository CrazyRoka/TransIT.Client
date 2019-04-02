import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public get IsLoggedIn() {
    return false;
  }

  public get IsLoggedOut() {
    return true;
  }

  constructor() { }

  ngOnInit() {
  }

}
