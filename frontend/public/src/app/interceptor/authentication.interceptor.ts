import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../app/services/authentication.service';
import { inject } from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log("Interceptor invoked");
  const authToken = inject(AuthenticationService).token;
  if (!authToken) {
    return next(req);
  }
  return next(req.clone({
    setHeaders: {
      Authorization: "Bearer " + authToken.token
    }
  }));
};
