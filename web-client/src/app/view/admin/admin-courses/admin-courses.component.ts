import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html'
})
export class AdminCoursesComponent implements OnInit {

  courses: any[] = [];
  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    const obj = this.api.session.getUser();
    if (obj) {
      this.api.course.all().subscribe((res: any) => this.courses = res.data)
    }
  }

  courseDelete(id: any) {
    this.api.course.delete(id).subscribe((res: any) => {
      Swal.fire('Ok', "course have been created!", 'success');
      this.ngOnInit();
    })
  }
}
