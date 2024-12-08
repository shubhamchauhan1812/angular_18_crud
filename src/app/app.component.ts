import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  empObj: EmployeeModel = new EmployeeModel(); 
  empList: EmployeeModel[] = []; 
  
  constructor (){
    this.createForm();
    const oldData = localStorage.getItem("empData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.empList = parseData;
    }
  }
  
  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.empObj.empId),
      name: new FormControl(this.empObj.name, [Validators.required]),
      city: new FormControl(this.empObj.city),
      state: new FormControl(this.empObj.state),
      email: new FormControl(this.empObj.email),
      contactNo:new FormControl(this.empObj.contactNo),
      address:new FormControl(this.empObj.address),
      pinCode:new FormControl(this.empObj.pinCode, [Validators.required, Validators.minLength(6)])
      
    })
  }

  onSave(){
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.empList.unshift(this.employeeForm.value);
    }
    else{
      this.empList.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.empList));
    this.empObj = new EmployeeModel();  
    this.createForm();
  }

  onEdit(item: EmployeeModel){
    this.empObj = item;
    this.createForm()
  }

  onUpdate(){
    debugger;
    // in the record we are trying to filter the particular record with 'empId'
    const record = this.empList.find(m=>m.empId == this.employeeForm.controls['empId'].value)
    if(record != undefined){
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.email = this.employeeForm.controls['email'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.address = this.employeeForm.controls['address'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.empList))
    this.empObj = new EmployeeModel();  
    this.createForm();
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure want to delete?")
    if(isDelete){
      const index = this.empList.findIndex(m=>m.empId == id);
      this.empList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.empList));
    }
  }
}
