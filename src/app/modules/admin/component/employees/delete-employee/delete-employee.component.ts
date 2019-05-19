import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../models/employee/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {
  @Input() employee: Employee;
  @Output() deleteEmployee = new EventEmitter<Employee>();

  constructor(private employeeService: EmployeeService, private toast: ToastrService) {}

  delete(): void {
    this.employeeService
      .deleteEntity(this.employee.id)
      .subscribe(
        () => this.deleteEmployee.next(this.employee),
        () => this.toast.error('Не вдалось видалити працівника', 'Помилка видалення')
      );
  }
}
