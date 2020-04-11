import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  userName: any;
  pass: any;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() { }

  handleClick(e) {
    if (this.userName === 'admin' && this.pass === 'calculadora') {
      this.router.navigate(['./home']);
    }
  }
}
