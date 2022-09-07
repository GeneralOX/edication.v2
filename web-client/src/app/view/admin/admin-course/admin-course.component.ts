import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-course',
  template: `<app-courses-form
  [uid]="courseId"
  [course]="courseObj"
  (objectChanged)="formChangedHandler($event)"
  ></app-courses-form>`
})
export class AdminCourseComponent implements OnInit {


  isNew = true;
  userId = "";
  courseId = "";
  courseObj: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    const obj = apiService.session.getUser();
    if (obj) {
      this.userId = obj._id;
    }

    route.params.subscribe((r: any) => {
      if (r.id) {
        this.isNew = false;
        apiService.course.one(r.id).subscribe((res: any) => {
          this.courseObj = res.data
          this.courseId = (r.id);
        })
      }
      else
        this.isNew = true;
    });
  }

  ngOnInit(): void { }

  formChangedHandler(data: FormGroup) {
    console.log({ data, id: this.userId })
    if (!data.valid) { Swal.fire('Error', "All the field are required!", 'error'); return; }

    if (this.isNew) {
      this.apiService.course.create(this.userId, data.value).subscribe((res: any) => {
        Swal.fire('Ok', "course have been created!", 'success');
        this.router.navigate(["/admin/courses"])
      })
    } else {
      this.apiService.course.update(this.courseId, data.value).subscribe((res: any) => {
        if (res.success) {

          Swal.fire('Ok', "course have been created!", 'success');

          this.router.navigate(["/admin/courses"])
        }

        else
          Swal.fire('Error', res.message, 'error');
      })
    }
  }

}

