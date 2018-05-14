import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { LocalstorageService } from '../../../servicios/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() logIn = new EventEmitter<void>();
  user: any = {user: '', pass: ''};
  constructor(private service: LoginService, private localstorageService: LocalstorageService) { }

  ngOnInit() {
  }

  loginIt() {
    console.log(this.user);
    this.service.obtenerDatosLogin(this.user.user, this.user.pass).subscribe(
      result => {
        console.log(result);
        this.localstorageService.agregar('USER_DOMICILIOS', JSON.stringify(result));
        if (result.length > 0) {
          this.logIn.emit();
        } else {
          alert('Usuario o Password incorrecto');
        }
      }
    );
  }

}
