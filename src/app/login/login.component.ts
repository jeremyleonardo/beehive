import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { ControllerService } from '../services/controller/controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loadingCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private controllerService: ControllerService,
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.loadingCount++;
      this.controllerService.login(this.form.value.username, this.form.value.password).subscribe(response => {
        this.loadingCount--;
      })
    }
  }

}
