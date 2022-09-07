import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  original: any[] = []
  events: any[] = []
  constructor(private api: ApiService) {
    this.LoadEvents();
  }

  ngOnInit(): void { }

  LoadEvents() {
    this.api.event.all().subscribe((res: any) => {
      this.original = res.data;
      this.events = res.data;
    })
  }
  JoinEvent(postId: string) {
    const user = this.api.session.getUser();
    if (user == null) {
      Swal.fire(undefined, 'You need to login first!', 'info')
      return;
    }
    else {
      this.api.event.join(postId, { id: user._id }).subscribe((res: any) => {

        if (res.success)
          Swal.fire("Great", res.message, "success")
        else
          Swal.fire("Sorry", res.message, "warning")
      })
    }
  }

  SearchEvent(val: string) {
    this.events = this.original.filter((v) => (v.title as string).includes(val))
  }

}
