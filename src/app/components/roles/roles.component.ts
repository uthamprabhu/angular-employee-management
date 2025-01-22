import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  getAllRolesApi: string = "https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles"

  isLoading: boolean = true
  roleList: IRole [] = []
  http = inject(HttpClient)

  ngOnInit(): void {
    this.getAllRoles()
  }
  
  getAllRoles(){
    this.http.get<APIResponse>(this.getAllRolesApi)
    .subscribe((res: APIResponse) => {
      this.roleList = res.data
      this.isLoading = false
      console.log(this.roleList)
    })
  }
}
