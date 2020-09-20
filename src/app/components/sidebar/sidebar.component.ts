import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  collapsed: boolean = true;

  constructor(
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.controllerService.logout();
  }

}
