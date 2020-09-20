import { StorageService } from './../../services/storage/storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GuestGuard implements CanActivate {
	constructor(
		private router: Router,
		private storageService: StorageService
	) { }
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.storageService.getItem('username')) {
			this.router.navigate(['/dashboard']);
			return false;
		} else {
			return true;
		}

	}

}
