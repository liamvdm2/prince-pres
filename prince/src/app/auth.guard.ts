import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './shared/user.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const token = localStorage.getItem('token');
	const userRoleId = localStorage.getItem('userRole');

	if (token) {
		if (userRoleId === '1') {
			return true;
		} else {
			return false;
		}
	} else {
		window.location.href = '/login';
		return false;
	}
};