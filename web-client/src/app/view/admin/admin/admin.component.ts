import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.api.session.clearUser();
    this.router.navigate(["/"])
  }
}
