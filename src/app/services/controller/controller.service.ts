import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  response: any = {
    status: 200,
    msg: "",
    data: []
  }

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  public login(username: string, password: string): Observable<any> {
    var subject = new Subject<any>();
    this.apiService.loginMyclass(username, password).subscribe(
      res => {

        const cookies: string[] = res.cookies;
        const myclassSession: string = cookies[0].split(';')[0];
        this.storageService.setItem('username', username);
        this.storageService.setItem('myclass_session', myclassSession);
        this.storageService.setItem('myclass_session_iat', this.getCurrentDateTime());

        this.response.status = 200;
        this.response.msg = "success";
        this.response.data = res.data;
        this.router.navigate(['/dashboard']);

        subject.next(this.response);

      },
      error => {
        // this.response = this.responseService.generateError(error);
        // subject.next(this.response);
        subject.next(error);
      }

    );
    return subject.asObservable();
  }

  public logout(): void {
    this.storageService.clear();
    this.router.navigate(['/auth']);
  }

  public getViconList(): Observable<any> {
    var subject = new Subject<any>();
    this.apiService.getViconScheduleMyclass(this.storageService.getItem('myclass_session')).subscribe(
      res => {

        this.response.status = 200;
        this.response.msg = "success";
        this.response.data = res.data;
        this.storageService.setItem('vicon_schedule', JSON.stringify(res.data));

        subject.next(this.response);

      },
      error => {
        // this.response = this.responseService.generateError(error);
        // subject.next(this.response);
        subject.next(error);
      }

    );
    return subject.asObservable();
  }

  public getCurrentDateTime(): string {

    var date = new Date();
    var aaaa = date.getFullYear();
    var gg: any = date.getDate();
    var mm: any = (date.getMonth() + 1);

    if (gg < 10)
      gg = "0" + gg;

    if (mm < 10)
      mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours: any = date.getHours()
    var minutes: any = date.getMinutes()
    var seconds: any = date.getSeconds();

    if (hours < 10)
      hours = "0" + hours;

    if (minutes < 10)
      minutes = "0" + minutes;

    if (seconds < 10)
      seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

  }

}
