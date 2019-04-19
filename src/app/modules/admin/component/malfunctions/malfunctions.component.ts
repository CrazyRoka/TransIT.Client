import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-malfunctions',
  templateUrl: './malfunctions.component.html',
  styleUrls: ['./malfunctions.component.scss']
})
export class MalfunctionsComponent implements OnInit {

  users: User[] = [];

  constructor() { }

  ngOnInit() {
  }

}
