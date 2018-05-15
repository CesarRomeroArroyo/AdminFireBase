import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('#to-recover').on('click', function() {
          $('#loginform').slideUp();
          $('#recoverform').fadeIn();
      });
  }

  showLogin() {
    $('#recoverform').slideUp();
    $('#createform').slideUp();
    $('#loginform').fadeIn();
  }

  showCreateAccount() {
    $('#loginform').slideUp();
    $('#createform').fadeIn();
  }

}
