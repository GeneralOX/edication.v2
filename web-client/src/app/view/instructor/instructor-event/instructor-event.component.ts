import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructor-event',
  template: `<app-events-form
  [backTo]="'/instructor/events'"
  [uid]="eventId"
  [event]="eventObj"
  (objectChanged)="formChangedHandler($event)"
  ></app-events-form>`
})
export class InstructorEventComponent implements OnInit {

  isNew = true;
  userId = "";
  eventId = "";
  eventObj: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    const obj = apiService.session.getUser();
    if (obj) {
      this.userId = obj._id;
    }

    route.params.subscribe((r: any) => {
      if (r.id) {
        this.isNew = false;
        apiService.event.one(r.id).subscribe((res: any) => {
          this.eventObj = res.data
          this.eventId = (r.id);
        })
      }
      else {
        this.isNew = true;
      }
    });
  }

  ngOnInit(): void { }

  formChangedHandler(data: FormGroup) {
    console.log({ data, id: this.userId })
    if (!data.valid)
      Swal.fire('Error', "All the field are required!", 'error');

    if (this.isNew) {
      this.apiService.event.create(this.userId, data.value).subscribe((res: any) => {
        if (res.success) {
          Swal.fire('Ok', "event have been created!", 'success');
          this.router.navigate(["/instructor/events"])
        }
        else
          Swal.fire('Error', res.message, 'error');
      })
    } else {

      this.apiService.event.update(this.eventId, data.value).subscribe((res: any) => {
        if (res.success) {
          Swal.fire('OK', "event have been updated!", 'success');

          this.router.navigate(["/instructor/events"])
        }
        else
          Swal.fire('Error', res.message, 'error');

      })
    }
  }
}
