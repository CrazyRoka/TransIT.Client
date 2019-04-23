import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() user: User;
  @Output() deleteUser = new EventEmitter<User>();

  constructor(private service: UserService) {}

  ngOnInit() {}

  delete() {
    console.log('usdsjldlsidvjilsdvjer');
    console.log(this.user);
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.user.id).pipe(
      catchError(this.handleError)
    ).subscribe(data => {
      this.deleteUser.next(this.user);
    });
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\n Повідомлення: ${` Видалення не можливе!\nКористувач містить записи.`}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
