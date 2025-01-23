import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../model/class/Client';
import { ClientService } from '../../services/client.service';
import { APIResponse } from '../../model/interface/role';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientObj: Client = new Client()
  clientList: Client[] = []

  clientService = inject(ClientService)

  ngOnInit(): void {
    this.loadClient()
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
