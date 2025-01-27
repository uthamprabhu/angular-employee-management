import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponse, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("",
      [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl(""),
  })

  clientService = inject(ClientService)
  employeeList: Employee[] = []
  clientList: Client[] = []

  firstName = signal("ffff")

  projectList = signal<ClientProject[]>([])

  ngOnInit(): void {
    const name = this.firstName()
    this.getAllClient()
    this.getAllEmployee()
    this.getAllClientProjects()
  }

  changeFName() {
    this.firstName.set('reactjsss')
  }

  getAllEmployee() {
    this.clientService.getAllEmployee().subscribe((res: APIResponse) => {
      this.employeeList = res.data
    })
  }

  getAllClient() {
    this.clientService.getAllClients().subscribe((res: APIResponse) => {
      this.clientList = res.data
    })
  }

  getAllClientProjects() {
    this.clientService.getAllClientProject().subscribe((res: APIResponse) => {
      this.projectList.set(res.data)
    })
  }

  onSaveProject() {
    const formValue = this.projectForm.value
    debugger
    this.clientService.addUpdateClientProject(formValue).subscribe((res: APIResponse) => {
      if (res.result) {
        alert('Project created successfully!')
      } else {
        alert(res.message)
      }
    })
  }
}
