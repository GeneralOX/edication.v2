import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-event',
  templateUrl: './student-event.component.html',
})
export class StudentEventComponent implements OnInit {

  events: any[] = []
  constructor(private api: ApiService) {
    this.LoadEvents();
  }

  ngOnInit(): void { }

  LoadEvents() {
    const user = this.api.session.getUser();
    if (user == null) {

      return;
    }
    this.api.user.my_events(user._id).subscribe(
      (res: any) => {
        this.events = res.data;
      })
  }
}
