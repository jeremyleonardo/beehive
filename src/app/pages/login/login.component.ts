import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControllerService } from '../../services/controller/controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loadingCount: number = 0;
  subs = new Subscription();

  form: FormGroup;

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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit() {
    if (this.form.valid) {
      this.loadingCount++;
      this.subs.add(
        this.controllerService.login(this.form.value.username, this.form.value.password).subscribe(response => {
          this.loadingCount--;
        })
      );
    }
  }

}
