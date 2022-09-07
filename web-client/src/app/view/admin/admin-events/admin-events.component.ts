import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html'
})
export class AdminEventsComponent implements OnInit {

  events: any[] = []
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    const obj = this.api.session.getUser();
    if (obj) {
      this.api.user.events(obj._id).subscribe((res: any) => this.events = res.data)
    }
  }
  eventDelete(id: string) {
    this.api.event.delete(id).subscribe((res: any) => {
      Swal.fire('Ok', "event have been created!", 'success');
      this.ngOnInit();
    })
  }
}
