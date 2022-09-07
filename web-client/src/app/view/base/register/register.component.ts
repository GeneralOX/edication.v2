import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required)
  });

  constructor(private api: ApiService, private router: Router) {
    const user = this.api.session.getUser();
    if (user != null) {
      this.router.navigate([this.api.session.PermissionRedirect(user.role)]);

      return;
    }
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (!this.userForm.valid) { Swal.fire('Error', "All the field are required!", 'error'); return; }

    console.log(this.userForm.value)
    this.api.user.register(this.userForm.value)
      .subscribe(
        (res: any) => {
          if (res.success) {
            Swal.fire('Great', res.message, 'success');

            this.router.navigate(["confirm"]);
          }
          else {
            Swal.fire('Error', res.message, 'error');
          }
        })
  }
}

