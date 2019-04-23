import { Component, OnInit, ChangeDetectorRef, Output, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role/role';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  roleList: Role[] = [];
  user: User;
  dataTable: any;

  private readonly tableParams: DataTables.Settings = {
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    columns: [
      {
        title: 'Прізвище'
      },
      {
        title: 'Ім\'я'
      },
      {
        title: 'По_батькові'
      },
      {
        title: 'Логін'
      },
      {
        title: 'Номер',
        orderable: false
      },
      {
        title: 'Роль'
      },
      {
        title: '',
        orderable: false
      },
      {
        title: '',
        orderable: false
      }
    ]
  };
  constructor(private service: UserService, private serviceRole: RoleService) {}

  ngOnInit() {
    $('#userTable').DataTable(this.tableParams);

    this.serviceRole.getEntities().subscribe(role => (this.roleList = role));
    this.service.getEntities().subscribe(users => {
      this.addTableData(users);
    });
  }
  addTableData(newUsers: User[]) {
    this.users = [...newUsers];
    const view = newUsers.map(i => [
      i.lastName,
      i.firstName,
      i.middleName,
      i.login,
      i.phoneNumber,
      i.role.transName,
      `<button id="edit-user-${
        i.login
        }" class="btn" data-toggle="modal" data-target="#editUser"><i class="fas fa-edit"></i></button>`,
      `<button id="delete-user-${
        i.login
        }" class="btn" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt color"></i></button>`
    ]);

    this.dataTable = $('#userTable')
      .dataTable()
      .api().clear()
      .rows.add(view)
      .draw();


    $('button[id^="edit-user"]')
      .off('click')
      .on('click', event => {
        const idTokens = event.currentTarget.id.split('-');
        const login = idTokens[idTokens.length - 1];
        this.user = this.users.find(i => i.login === login);
      });

    $('button[id^="delete-user"]')
      .off('click')
      .on('click', event => {
        const idTokens = event.currentTarget.id.split('-');
        const login = idTokens[idTokens.length - 1];
        this.user = this.users.find(i => i.login === login);
      });
  }
  updateUser(user: User) {
      console.log('user');
      console.log(user);
      this.users[this.users.findIndex(i => i.login === user.login)] = user;
      this.service.getEntities().subscribe(users => {
      this.addTableData(users);
    });
  }
  addUser(user: User) {
    this.users.push(user);
    this.addTableData(this.users);
    console.log(this.dataTable.data());
  }

  deleteUser(user: User) {
      this.users.splice(this.users.findIndex(i => i.login === user.login), 1);
      this.addTableData(this.users);
  }

}
