import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';
import { environment } from '../../environments/environment.development';
import { Client } from '../model/class/Client';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<APIResponse> {
    return this.http.get<APIResponse>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT)
  }

  getAllUser(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getAllClientProject(): Observable<APIResponse> {
    return this.http.get<APIResponse>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT_PROJECTS)
  }

  getAllEmployee(): Observable<APIResponse> {
    return this.http.get<APIResponse>(environment.API_URL + Constant.API_METHOD.GET_ALL_EMPLOYEE)
  }

  addUpdate(obj: Client): Observable<APIResponse> {
    return this.http.post<APIResponse>(environment.API_URL + "AddUpdateClient", obj)
  }

  deleteClientById(id: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(environment.API_URL + "DeleteClientByClientId?clientId=" + id)
  }

  addUpdateClientProject(obj: Client): Observable<APIResponse> {
    return this.http.post<APIResponse>(environment.API_URL + "AddUpdateClientProject", obj)
  }
}
