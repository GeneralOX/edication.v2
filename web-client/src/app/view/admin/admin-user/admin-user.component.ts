import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {



  userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    role: new FormControl(0, Validators.required),
  });
  userId = "";



  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    route.params.subscribe((r: any) => this.userId = (r.id));
    apiService.user.one(this.userId).subscribe((res: any) => {
      this.userForm.setValue({ name: res.data.name, username: res.data.username, password: res.data.password, role: res.data.role })
    })
  }
  ngOnInit(): void { }
  onSubmit() {
    if (!this.userForm.valid) {
      Swal.fire('Error', "All the field are required!", 'error');
      return;
    }
    console.log(this.userForm.value)
    this.apiService.user.update(this.userId, this.userForm.value).subscribe((res: any) => {
      if (res.success) {
        this.userForm.setValue({ name: res.data.name, username: res.data.username, password: res.data.password, role: res.data.role })

        Swal.fire('Ok', "user have been updated", 'success');

      }
      else {
        Swal.fire('Ok', res.message, 'success');

      }
    })
  }
}

