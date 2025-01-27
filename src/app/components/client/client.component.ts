import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../model/class/Client';
import { ClientService } from '../../services/client.service';
import { APIResponse } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";
import { MyButtonComponent } from "../../reusableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  currentDate: Date = new Date()

  clientObj: Client = new Client()
  clientList: Client[] = []

  clientService = inject(ClientService)

  userList$: Observable<any> = new Observable<any>

  ngOnInit(): void {
    this.loadClient()
    this.userList$ = this.clientService.getAllUser()
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResponse) => {
      this.clientList = res.data
    })
  }

  onSaveClient() {
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponse) => {
      if (res.result) {
        alert('Client created success')
        this.loadClient()
        this.clientObj = new Client()
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: Client) {
    this.clientObj = data
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?")
    if (isDelete) {
      this.clientService.deleteClientById(id).subscribe((res: APIResponse) => {
        if (res.result) {
          alert('Client deleted success')
          this.loadClient()
        } else {
          alert(res.message)
        }
      })
    }
  }
}