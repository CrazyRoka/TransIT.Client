import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $(document).ready(function() {
      $('#example').DataTable({
        processing: true,
        ajax:
          'https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json',
        columns: [{ data: 'data' }]
      });
    });
  }
}
