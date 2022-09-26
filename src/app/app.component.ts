import { Component } from '@angular/core';
// import employeeData from '../assets/SampleData/employees.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // public employees: Employee[];
  // public relationships: Relationship[];
  public width: number = 10;
  public height: number = 10;
  public x: number = 50;
  public y: number = 50;
  public boxshow: boolean = false;
  public circleshow: boolean = false;
  public circle() {
    this.circleshow = true;
    this.boxshow = false;
    this.x = 50;
    this.y = 50;
  }
  public box() {
    this.circleshow = false;
    this.boxshow = true;
    this.x = 50;
    this.y = 50;
  }
  public increaseWidth() {
    this.width = this.width + 50;
  }
  public increaseHeight() {
    this.height = this.height + 50;
  }
  public increaseUp() {
    this.y = this.y - 50;
  }
  public increaseDown() {
    this.y = this.y + 50;
  }
  public increaseLeft() {
    this.x = this.x + 50;
  }
  public increaseRight() {
    this.x = this.x - 50;
  }
  constructor() {
    //  Populate our two arrays from our sample-data .json file
    // this.employees = employeeData.employees;
    // this.relationships = employeeData.relationships;
  }
  // public GetEmployee(id: number): any {
  //   //  Search for, and return, an Employee record, with a particular id value
  //   const employee = this.employees.filter((emp) => {
  //     return emp.id === id;
  //   });
  //   if (employee == null) {
  //     return null;
  //   }
  //   return employee[0];
  // }

  // public IsSubManager(relationshipType: string) {
  //   return relationshipType === 'Sub-manager';
  // }

  // public mousedown(event: Event) {
  //   let e = event as MouseEvent;

  //   let element = event.target as HTMLElement;
  //   let rect = element.getBoundingClientRect();

  //   // element.className
  //   // alert(`mouse position : ${e.clientX}:${e.clientY}`);
  //   alert(`element position : ${rect.x}:${rect.y}`);
  // }
}

// interface Employee {
//   id: number;
//   job: string;
//   firstName: string;
//   lastName: string;
//   imageUrl: string;
//   DOB: string;
//   phoneNumber: string;
//   xpos: number;
//   ypos: number;
// }

// interface Relationship {
//   employeeId: number;
//   managerId: number;
//   type: string; // "Manager" or "Sub-manager"
// }
