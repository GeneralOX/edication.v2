import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
    const user = this.api.session.getUser();
    if (user != null) {
      this.router.navigate([this.api.session.PermissionRedirect(user.role)]);

      return;
    }
  }

  userForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.userForm.valid) { Swal.fire('Error', "All the field are required!", 'error'); return; }

    console.log(this.userForm.value)
    this.api.user.login(this.userForm.value)
      .subscribe(
        (res: any) => {
          if (res.success) {
            Swal.fire('Great', res.message, 'success');
            this.api.session.setUser(res.user)
            this.router.navigate([this.api.session.PermissionRedirect(res.user.role)]);
          }
          else {
            Swal.fire('Error', res.message, 'error');
          }
        })
  }
}
