import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('XSRF-TOKEN');
    if (csrfToken) {
      req = req.clone({
        setHeaders: { 'X-CSRF-TOKEN': csrfToken }
      });
    }
    return next.handle(req);
  }
}
