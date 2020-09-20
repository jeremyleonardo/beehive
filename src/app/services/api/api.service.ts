import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  netlifyRoute = '/.netlify/functions';

  constructor(
    private http: HttpClient,
  ) {

  }

  public loginMyclass(username: string, password: string): Observable<any> {
    const body = {
      'Username': username,
      'Password': password
    };
    return this.http.post<any>(`${origin}${this.netlifyRoute}/loginMyclass`, body, this.getJsonHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  public getViconScheduleMyclass(session: string): Observable<any> {
    const body = `?Cookie=${session}`;
    return this.http.get<any>(`${origin}${this.netlifyRoute}/getViconScheduleMyclass${body}`, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };
  }

  private getJsonHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }

  private handleError(err: HttpErrorResponse) {
    let response = {
      status: 500,
      type: "PRIVATE",
      message: ""
    }
    if (err.error instanceof ErrorEvent) {
      response.message = `An error occurred: ${err.error.message}`;
    } else {
      if (err.error.message != null) {
        console.log(err.error.status_code + ' : ' + err.error.message);
        response.message = err.error.message;
        response.type = err.error.status_type;
        response.status = err.error.status_code;
      }
      else {
        response.status = err.status;
        response.message = err.message;
      }
    }
    return throwError(response);
  }

}
