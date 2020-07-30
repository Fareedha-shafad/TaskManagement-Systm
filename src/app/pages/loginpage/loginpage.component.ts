import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service'
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      // if (res.status === 200) {
      //   // we have logged in successfully
      //   this.router.navigate(['/lists']);
      // }
      console.log(res);
      
    });
  }

}