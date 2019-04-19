import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-malfunc',
  templateUrl: './malfunc.component.html',
  styleUrls: ['./malfunc.component.scss']
})
export class MalfuncComponent implements OnInit {

  users: User[] = [];

  constructor() { }

  ngOnInit() {
    $('#malfunc').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
  }

}
