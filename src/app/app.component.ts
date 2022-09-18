import { Component } from '@angular/core';
import employeeData from '../assets/SampleData/employees.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public employees: Employee[];
  public relationships: Relationship[];

  constructor() {
    //  Populate our two arrays from our sample-data .json file
    this.employees = employeeData.employees;
    this.relationships = employeeData.relationships;
  }
  public GetEmployee(id: number): any {
    //  Search for, and return, an Employee record, with a particular id value
    const employee = this.employees.filter(emp => {
      return emp.id === id;
    });
    if (employee == null) {
      return null;
    }
    return employee[0];
  }

  public IsSubManager(relationshipType: string) {
    return (relationshipType === 'Sub-manager');
  }


  public mousedown(event: Event){
    let e = event as MouseEvent;

    let element = event.target as HTMLElement;
    let rect = element.getBoundingClientRect();
    
    // element.className
    // alert(`mouse position : ${e.clientX}:${e.clientY}`);
    alert(`element position : ${rect.x}:${rect.y}`);
  }
}

interface Employee {
  id: number;
  job: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  DOB: string;
  phoneNumber: string;
  xpos: number;
  ypos: number;
}

interface Relationship {
  employeeId: number;
  managerId: number;
  type: string;           // "Manager" or "Sub-manager"
}