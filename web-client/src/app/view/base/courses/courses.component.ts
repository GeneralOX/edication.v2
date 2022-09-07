import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {

  original: any[] = []
  courses: any[] = []
  constructor(private api: ApiService) {
    this.LoadCourses();
  }

  ngOnInit(): void { }

  LoadCourses() {
    this.api.course.all().subscribe((res: any) => {
      this.original = res.data;
      this.courses = res.data;
    })
  }
  JoinCourse(postId: string) {
    const user = this.api.session.getUser();
    if (user == null) {
      Swal.fire(undefined, 'You need to login first!', 'info')
      return;
    }
    else {
      this.api.course.join(postId, { id: user._id }).subscribe((res: any) => {

        if (res.success)
          Swal.fire("Great", res.message, "success")
        else
          Swal.fire("Sorry", res.message, "warning")
      })
    }
  }

  SearchCourse(val: string) {
    this.courses = this.original.filter((v) => (v.title as string).includes(val))
  }


}
