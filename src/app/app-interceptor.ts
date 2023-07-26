/* import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { EMPTY, Observable, catchError, tap } from 'rxjs'
import { Provider } from '@angular/core';
import { UserService } from './user/user.service';

export class AppInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;        

        return next.handle(request).pipe(tap((req) => {
            if (req instanceof HttpRequest) {
                console.log(req);
            }
        }),         
        catchError((err) => {
            console.error(`Error from Interceptor: ${JSON.stringify(err)}`);
            console.error(err.message);
            
            if (err.status === 0) {
                return EMPTY;
            }
            return [err];
        })

        )
    }
    constructor(){}
}

export const appInterceptorProvider: Provider =  {
    provide: HTTP_INTERCEPTORS, 
    multi: true,
    useClass: AppInterceptor
} */