import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponse, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  ngOnInit(): void {
    this.getAllClient()
    this.getAllEmployee()
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
