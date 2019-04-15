import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class EngineerGuard implements  {
  constructor(private service: AuthenticationService) {}

  canActivate(): boolean {
    return this.service.getRole() === 'ENGINEER';
  }
}
