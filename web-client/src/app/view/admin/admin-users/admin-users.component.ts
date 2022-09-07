import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {

  users: any[] = []
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.user.all().subscribe((res: any) => { this.users = res.data })
  }

  getRole(n: number) {
    if (n == 3)
      return "student"
    else if (n == 2)
      return "instructor"
    else if (n == 1)
      return "admin"
    else
      return "null"
  }

  userConfirm(id: any) {
    this.api.user.confirm(id).subscribe((res: any) => {
      this.users = this.users.map((v) => {
        if (v._id == id) v.active = true;
        return v;
      })
    })

  }
  userDelete(id: any) {
    this.api.user.delete(id).subscribe((res: any) => {
      this.users = this.users.filter((v) => v._id != id);
    })

  }
}
