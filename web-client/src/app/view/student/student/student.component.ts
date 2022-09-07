import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  links = [
    { name: "my courses", url: "/student/courses" },
    { name: "my events", url: "/student/events" }
  ]
  username: string = "";
  constructor(private api: ApiService, private router: Router) {
    const user = api.session.getUser();
    if (user != null) {
      this.username = user.name;
    }
  }

  ngOnInit(): void {
  }
  logout() {
    this.api.session.clearUser();
    this.router.navigate(["/"])
  }

}
