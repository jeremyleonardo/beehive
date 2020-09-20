import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ControllerService } from 'src/app/services/controller/controller.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-video-conference',
  templateUrl: './video-conference.component.html',
  styleUrls: ['./video-conference.component.scss']
})
export class VideoConferenceComponent implements OnInit, OnDestroy {

  loadingCount: number = 0;
  subs = new Subscription();

  viconSchedule: any[] = [];

  constructor(
    private controllerService: ControllerService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    if (this.storageService.getItem('vicon_schedule')) {
      this.viconSchedule = JSON.parse(this.storageService.getItem('vicon_schedule'));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getViconSchedule() {
    this.loadingCount++;
    this.subs.add(
      this.controllerService.getViconList().subscribe(res => {
        this.viconSchedule = [...res.data];
        this.loadingCount--;
      }, err => this.loadingCount--)
    );
  }

}
